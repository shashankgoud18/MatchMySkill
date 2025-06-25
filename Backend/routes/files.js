// routes/files.js - File management routes
const express = require('express');
const path = require('path');
const fs = require('fs');
const fileHandler = require('../utils/fileHandler');

const router = express.Router();

// Get all files (with optional user filtering)
router.get('/', async (req, res) => {
  try {
    const { userId, limit = 50, offset = 0 } = req.query;
    
    let files;
    if (userId) {
      files = await fileHandler.getFilesByUserId(userId);
    } else {
      files = await fileHandler.getAllFiles();
    }

    // Apply pagination
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedFiles = files.slice(startIndex, endIndex);

    // Remove sensitive data for response
    const safeFiles = paginatedFiles.map(file => ({
      id: file.id,
      originalName: file.originalName,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
      uploadedAt: file.uploadedAt,
      userId: file.userId,
      analysisCount: file.analysisHistory?.length || 0,
      lastAnalyzedAt: file.analysisHistory?.length > 0 
        ? file.analysisHistory[file.analysisHistory.length - 1].analyzedAt 
        : null
    }));

    res.json({
      success: true,
      data: safeFiles,
      pagination: {
        total: files.length,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: endIndex < files.length
      }
    });

  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch files'
    });
  }
});

// Get specific file details
router.get('/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await fileHandler.getFileById(fileId);

    if (!file) {
      return res.status(404).json({
        success: false,
        error: 'File not found',
        message: 'The requested file was not found'
      });
    }

    // Return file details without the actual file content
    const fileDetails = {
      id: file.id,
      originalName: file.originalName,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
      uploadedAt: file.uploadedAt,
      userId: file.userId,
      analysisHistory: file.analysisHistory || []
    };
    res.json({
      success: true,
      data: fileDetails
    });
    } catch (error) {
    console.error('Error fetching file details:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch file details'
    });
    }
}
);

module.exports = router;