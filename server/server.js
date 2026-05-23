const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const hpp = require('hpp');

dotenv.config();

const connectDB = require('#utils/misc/misc.db');
const { notFound, errorHandler } = require('#middleware/error.middleware');
const { cleanInput } = require('#middleware/security.middleware');

const productRoutes = require('#routes/user/user.product.route');
const categoryRoutes = require('#routes/user/user.category.route');
const authRoutes = require('#routes/user/user.auth.route');
const profileRoutes = require('#routes/user/user.profile.route');
const orderRoutes = require('#routes/user/user.order.route');
const adminProductRoutes = require('#routes/admin/admin.product.route');
const adminOrderRoutes = require('#routes/admin/admin.order.route');
const adminStatsRoutes = require('#routes/admin/admin.stats.route');
const adminUserRoutes = require('#routes/admin/admin.user.route');
const settingRoutes = require('#routes/misc/misc.setting.route');

connectDB();

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 5000;

app.use(helmet({
  crossOriginResourcePolicy: false, 
}));

app.use(compression());
app.use(morgan('dev'));

const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:3000'].filter(Boolean);
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(hpp());
app.use(cleanInput);
app.use('/uploads', express.static('uploads', {
  maxAge: '31536000000', // 1 year in milliseconds
  immutable: true
}));

app.use('/api/solestyle/admin/products', adminProductRoutes);
app.use('/api/solestyle/admin/orders', adminOrderRoutes);
app.use('/api/solestyle/admin/stats', adminStatsRoutes);
app.use('/api/solestyle/admin/users', adminUserRoutes);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again after a minute',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  message: 'Too many authentication attempts, please try again after a minute',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use('/api/solestyle/products', productRoutes);
app.use('/api/solestyle/categories', categoryRoutes);
app.use('/api/solestyle/auth', authLimiter, authRoutes);
app.use('/api/solestyle/profile', profileRoutes);
app.use('/api/solestyle/orders', orderRoutes);
app.use('/api/solestyle/settings', settingRoutes);

app.get('/', (req, res) => {
  res.send('SoleStyle API is running...');
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
