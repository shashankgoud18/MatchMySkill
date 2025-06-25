// routes/upload.js - File upload routes
const express = require('express');
const { upload, handleMulterError } = require('../middlewares/upload');
const fileHandler = require('../utils/fileHandler');

const router = express.Router();

// Upload resume endpoint
router.post('/resume', upload.single('resume'), handleMulterError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded',
        message: 'Please select a file to upload'
      });
    }

    // Add additional metadata from request body
    const fileInfo = {
      ...req.file,
      userId: req.body.userId || 'anonymous',
      extractedText: req.body.extractedText || '',
      jobDescription: req.body.jobDescription || ''
    };

    // Save file metadata to database
    const savedMetadata = await fileHandler.saveFileMetadata(fileInfo);

    console.log(`✅ File uploaded successfully: ${req.file.originalname}`);
    console.log(`📁 Stored as: ${req.file.filename}`);
    console.log(`👤 User ID: ${fileInfo.userId}`);

    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        fileId: savedMetadata.id,
        originalName: savedMetadata.originalName,
        filename: savedMetadata.filename,
        size: savedMetadata.size,
        mimetype: savedMetadata.mimetype,
        uploadedAt: savedMetadata.uploadedAt,
        userId: savedMetadata.userId
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    
    // Clean up uploaded file if database save failed
    if (req.file && req.file.path) {
      const fs = require('fs');
      try {
        fs.unlinkSync(req.file.path);
        console.log('Cleaned up uploaded file due to error');
      } catch (cleanupError) {
        console.error('Error cleaning up file:', cleanupError);
      }
    }

    res.status(500).json({
      success: false,
      error: 'Upload failed',
      message: 'An error occurred while processing your file'
    });
  }
});

// Save analysis result for uploaded resume
router.post('/save-analysis', async (req, res) => {
  try {
    const { fileId, analysisResult } = req.body;

    if (!fileId || !analysisResult) {
      return res.status(400).json({
        success: false,
        error: 'Missing required data',
        message: 'Both fileId and analysisResult are required'
      });
    }

    const result = await fileHandler.addAnalysisResult(fileId, analysisResult);

    if (result.success) {
      console.log(`💾 Analysis result saved for file: ${fileId}`);
      res.json({
        success: true,
        message: 'Analysis result saved successfully',
        data: result.data
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Failed to save analysis',
        message: result.message
      });
    }

  } catch (error) {
    console.error('Error saving analysis result:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to save analysis result'
    });
  }
});

// Upload status check endpoint
router.get('/status/:fileId', async (req, res) => {
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

    res.json({
      success: true,
      data: {
        fileId: file.id,
        originalName: file.originalName,
        uploadedAt: file.uploadedAt,
        size: file.size,
        analysisCount: file.analysisHistory?.length || 0
      }
    });

  } catch (error) {
    console.error('Error checking upload status:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to check upload status'
    });
  }
});

module.exports = router;