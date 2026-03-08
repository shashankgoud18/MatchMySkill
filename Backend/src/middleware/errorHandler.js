const multer = require('multer');

function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: `Cannot ${req.method} ${req.originalUrl}`,
  });
}

function errorHandler(error, req, res, next) {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({
        success: false,
        message: 'File too large',
        error: 'Maximum file size is 10MB',
      });
      return;
    }

    res.status(400).json({
      success: false,
      message: 'Upload error',
      error: error.message,
    });
    return;
  }

  if (error && error.message === 'Not allowed by CORS') {
    res.status(403).json({
      success: false,
      message: 'CORS error',
      error: error.message,
    });
    return;
  }

  if (error) {
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
      success: false,
      message: statusCode >= 500 ? 'Internal server error' : 'Request failed',
      error: error.message || 'Unknown error',
    });
    return;
  }

  next();
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
