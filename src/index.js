const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/albums', require('./routes/albumRoutes'));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Cover Carousel API'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server Error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving static files from: 
    ${path.join(__dirname, '../public')}
    ${path.join(__dirname, '../../public')}
  `);
}); 