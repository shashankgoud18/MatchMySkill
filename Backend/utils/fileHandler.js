// utils/fileHandler.js - File handling utilities
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class FileHandler {
  constructor() {
    this.dbPath = process.env.DB_FILE || './uploads/file-database.json';
    this.uploadDir = process.env.UPLOAD_DIR || './uploads/resumes';
  }

  // Read database
  async readDatabase() {
    try {
      const data = await fs.readFile(this.dbPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading database:', error);
      return [];
    }
  }

  // Write to database
  async writeDatabase(data) {
    try {
      await fs.writeFile(this.dbPath, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error('Error writing to database:', error);
      return false;
    }
  }

  // Save file metadata
  async saveFileMetadata(fileInfo) {
    try {
      const database = await this.readDatabase();
      
      const metadata = {
        id: uuidv4(),
        originalName: fileInfo.originalname,
        filename: fileInfo.filename,
        path: fileInfo.path,
        size: fileInfo.size,
        mimetype: fileInfo.mimetype,
        uploadedAt: new Date().toISOString(),
        userId: fileInfo.userId || 'anonymous',
        extractedText: fileInfo.extractedText || '',
        analysisHistory: []
      };

      database.push(metadata);
      const success = await this.writeDatabase(database);
      
      if (success) {
        return metadata;
      } else {
        throw new Error('Failed to save metadata to database');
      }
    } catch (error) {
      console.error('Error saving file metadata:', error);
      throw error;
    }
  }

  // Get file by ID
  async getFileById(fileId) {
    try {
      const database = await this.readDatabase();
      return database.find(file => file.id === fileId);
    } catch (error) {
      console.error('Error getting file by ID:', error);
      return null;
    }
  }

  // Get files by user ID
  async getFilesByUserId(userId) {
    try {
      const database = await this.readDatabase();
      return database.filter(file => file.userId === userId);
    } catch (error) {
      console.error('Error getting files by user ID:', error);
      return [];
    }
  }

  // Get all files
  async getAllFiles() {
    try {
      return await this.readDatabase();
    } catch (error) {
      console.error('Error getting all files:', error);
      return [];
    }
  }

  // Delete file
  async deleteFile(fileId) {
    try {
      const database = await this.readDatabase();
      const fileIndex = database.findIndex(file => file.id === fileId);
      
      if (fileIndex === -1) {
        return { success: false, message: 'File not found in database' };
      }

      const file = database[fileIndex];
      
      // Delete physical file
      try {
        await fs.unlink(file.path);
      } catch (unlinkError) {
        console.warn('Warning: Could not delete physical file:', unlinkError.message);
      }

      // Remove from database
      database.splice(fileIndex, 1);
      const success = await this.writeDatabase(database);

      if (success) {
        return { success: true, message: 'File deleted successfully' };
      } else {
        return { success: false, message: 'Failed to update database' };
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      return { success: false, message: 'Error deleting file: ' + error.message };
    }
  }

  // Update file metadata (e.g., add analysis result)
  async updateFileMetadata(fileId, updates) {
    try {
      const database = await this.readDatabase();
      const fileIndex = database.findIndex(file => file.id === fileId);
      
      if (fileIndex === -1) {
        return { success: false, message: 'File not found' };
      }

      // Update the file metadata
      database[fileIndex] = { ...database[fileIndex], ...updates };
      const success = await this.writeDatabase(database);

      if (success) {
        return { success: true, data: database[fileIndex] };
      } else {
        return { success: false, message: 'Failed to update database' };
      }
    } catch (error) {
      console.error('Error updating file metadata:', error);
      return { success: false, message: 'Error updating file: ' + error.message };
    }
  }

  // Add analysis result to file
  async addAnalysisResult(fileId, analysisResult) {
    try {
      const database = await this.readDatabase();
      const fileIndex = database.findIndex(file => file.id === fileId);
      
      if (fileIndex === -1) {
        return { success: false, message: 'File not found' };
      }

      const analysisEntry = {
        id: uuidv4(),
        analyzedAt: new Date().toISOString(),
        jobTitle: analysisResult.jobTitle || 'Unknown Position',
        provider: analysisResult.provider || 'Unknown',
        result: analysisResult
      };

      database[fileIndex].analysisHistory.push(analysisEntry);
      const success = await this.writeDatabase(database);

      if (success) {
        return { success: true, data: analysisEntry };
      } else {
        return { success: false, message: 'Failed to save analysis result' };
      }
    } catch (error) {
      console.error('Error adding analysis result:', error);
      return { success: false, message: 'Error saving analysis: ' + error.message };
    }
  }

  // Get file statistics
  async getFileStats() {
    try {
      const database = await this.readDatabase();
      const totalFiles = database.length;
      const totalSize = database.reduce((sum, file) => sum + (file.size || 0), 0);
      
      const fileTypes = database.reduce((acc, file) => {
        const type = file.mimetype || 'unknown';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

      const uniqueUsers = new Set(database.map(file => file.userId)).size;

      return {
        totalFiles,
        totalSize,
        totalSizeMB: Math.round(totalSize / (1024 * 1024) * 100) / 100,
        fileTypes,
        uniqueUsers,
        averageFileSize: totalFiles > 0 ? Math.round(totalSize / totalFiles) : 0
      };
    } catch (error) {
      console.error('Error getting file statistics:', error);
      return null;
    }
  }
}

module.exports = new FileHandler();