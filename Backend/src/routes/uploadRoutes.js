const express = require('express');

const upload = require('../middleware/uploadMiddleware');
const { uploadResume } = require('../controllers/uploadController');

const router = express.Router();

router.post('/upload', upload.single('resume'), uploadResume);

module.exports = router;
