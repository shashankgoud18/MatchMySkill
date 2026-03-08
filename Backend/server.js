const express = require('express');
const cors = require('cors');

require('./src/config/env');

const { corsOptions } = require('./src/config/cors');
const { PORT } = require('./src/config/env');
const limiter = require('./src/middleware/rateLimiter');
const uploadRoutes = require('./src/routes/uploadRoutes');
const analysisRoutes = require('./src/routes/analysisRoutes');
const { notFoundHandler, errorHandler } = require('./src/middleware/errorHandler');

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(limiter);

app.get('/', (req, res) => {
	res.send('MatchMySkill backend is live!');
});

app.get('/health', (req, res) => {
  res.send("Everything is working fine!");
	res.status(200).json({
		status: 'OK',
		uptime: process.uptime(),
		timestamp: Date.now(),
	});
});

app.use(uploadRoutes);
app.use(analysisRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});