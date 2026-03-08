const { NODE_ENV, FRONTEND_URL } = require('./env');

const allowedOrigins = NODE_ENV === 'production'
  ? [
      'https://matchmyskill.vercel.app',
      'https://match-my-skill-plby.vercel.app',
      FRONTEND_URL,
    ].filter(Boolean)
  : ['http://localhost:3000'];

console.log('Allowed CORS origins:', allowedOrigins);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      callback(null, true);
      return;
    }

    if (!allowedOrigins.includes(origin)) {
      console.warn(`❌ CORS blocked origin: ${origin}`);
      console.warn(`✅ Allowed origins: ${allowedOrigins.join(', ')}`);
      callback(new Error('Not allowed by CORS'));
      return;
    }

    console.log(`✅ CORS allowed origin: ${origin}`);
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};

module.exports = {
  corsOptions,
  allowedOrigins,
};
