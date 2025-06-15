// Simplified version of index.js for debugging
console.log('Starting simplified server...');

// Load environment variables FIRST
require('dotenv').config();

console.log('Environment variables loaded');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('DB_URL exists:', !!process.env.DB_URL);
console.log('JWT_SECRET_KEY exists:', !!process.env.JWT_SECRET_KEY);

// Validate required environment variables
const requiredEnvVars = ['DB_URL', 'JWT_SECRET_KEY'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  process.exit(1);
}

console.log('Environment validation passed');

// Basic Express setup
const express = require('express');
const cors = require('cors');

console.log('Express modules loaded');

const app = express();
const port = process.env.PORT || 5000;

// Basic middleware
app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true
}));

console.log('Basic middleware configured');

// Simple routes
app.get('/', (req, res) => {
  res.json({
    message: 'UWaterloo Marketplace API - Simplified',
    version: '1.0.0',
    status: 'active',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    api: 'healthy',
    timestamp: new Date().toISOString()
  });
});

console.log('Routes configured');

// Test database connection
const mongoose = require('mongoose');

console.log('Mongoose loaded, attempting database connection...');

mongoose.connect(process.env.DB_URL, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 10000
})
.then(() => {
  console.log('✅ Database connected successfully');
  
  // Start server only after DB connection
  const server = app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
    console.log('🚀 Simplified server started successfully!');
  });

  server.on('error', (err) => {
    console.error('❌ Server error:', err.message);
    process.exit(1);
  });
})
.catch((error) => {
  console.error('❌ Database connection failed:', error.message);
  console.error('Full error:', error);
  process.exit(1);
});

// Error handlers
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
  console.error('Stack:', err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise);
  console.error('Reason:', reason);
  process.exit(1);
}); 