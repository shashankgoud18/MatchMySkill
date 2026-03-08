const express = require('express');

const { analyzeResume } = require('../controllers/analysisController');

const router = express.Router();

router.post('/api/analyze', analyzeResume);

module.exports = router;
