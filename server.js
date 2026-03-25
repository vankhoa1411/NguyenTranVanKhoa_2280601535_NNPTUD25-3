require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const inventoryRoutes = require('./routes/inventory');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect Database
connectDB();

// Routes
app.use('/api', inventoryRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Có lỗi xảy ra trên server',
    error: err.message,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});
