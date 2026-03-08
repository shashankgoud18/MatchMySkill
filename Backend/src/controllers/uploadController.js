function uploadResume(req, res) {
  if (!req.file) {
    res.status(400).json({
      success: false,
      message: 'No file uploaded',
      error: 'File is required',
    });
    return;
  }

  console.log(`[${new Date().toISOString()}] File uploaded to memory: ${req.file.originalname}`);

  res.json({
    success: true,
    message: 'Upload successful',
    url: 'memory-only',
    public_id: req.file.originalname,
    fileName: req.file.originalname,
  });
}

module.exports = {
  uploadResume,
};
