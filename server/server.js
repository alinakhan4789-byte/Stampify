require('dotenv').config();
const express = require('express'), cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());
app.use(require('./utils/logger'));            // fs write-stream request log
app.get('/api/health', (_, res) => res.json({ ok: true }));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/businesses', require('./routes/businessRoutes'));
app.use('/api/loyalty', require('./routes/loyaltyRoutes'));
app.use('/api/rewards', require('./routes/rewardRoutes'));
app.use(notFound);
app.use(errorHandler);

connectDB()
  .then(() => app.listen(process.env.PORT || 5000, () => console.log(`Stampify API on port ${process.env.PORT || 5000}`)))
  .catch((e) => { console.error(e.message); process.exit(1); });
