// Load environment variables FIRST (before any other imports)
require('dotenv').config();

// Import logging system
const { createModuleLogger, info, error } = require('./src/config/logger');
const logger = createModuleLogger('server');

// Validate required environment variables
const requiredEnvVars = ['DB_URL', 'JWT_SECRET_KEY'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  error('Missing required environment variables', { missingEnvVars });
  process.exit(1);
}

// Core imports
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');

// Import configurations
const { connectDB } = require('./src/config/database');
const { securityMiddleware, getCorsOptions, rateLimiters } = require('./src/middleware/security');

// Import routes
const userRoute = require('./src/users/user.route');
const bookRoute = require('./src/book/book.route');
const orderRoute = require('./src/orders/order.route');
const listingRoute = require('./src/items/listing.route');
const adminRoute = require('./src/stats/admin.route');

// Import middleware
const { globalErrorHandler, notFoundHandler, healthCheck } = require('./src/middleware/errorHandler');

const app = express();
const port = process.env.PORT || 5000;

// Trust proxy for accurate IP addresses behind reverse proxy
app.set('trust proxy', 1);

// Security middleware (helmet, rate limiting, sanitization)
app.use(securityMiddleware);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// CORS configuration
app.use(cors(getCorsOptions()));

// Request logging
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined', {
    stream: {
      write: (message) => info(message.trim(), { type: 'access' })
    }
  }));
} else {
  app.use(morgan('dev'));
}

// Health check endpoint (before rate limiting)
app.get('/health', healthCheck);
app.get('/api/health', healthCheck);

// Apply rate limiting to all API routes
app.use('/api', rateLimiters.general);

// API Routes with specific rate limits
app.use('/api/auth', rateLimiters.auth, userRoute);
app.use('/api/books', bookRoute);
app.use('/api/orders', orderRoute);
app.use('/api/listings', rateLimiters.createListing, listingRoute);
app.use('/api/admin', adminRoute);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'UWaterloo Marketplace API',
    version: '1.0.0',
    status: 'active',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(globalErrorHandler);

// Graceful shutdown
const gracefulShutdown = (signal) => {
  logger.info(`Received ${signal}, starting graceful shutdown`);
  
  const server = app.listen(port);
  
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });

  // Force close after 30 seconds
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 30000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions and unhandled rejections
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', { error: err.message, stack: err.stack });
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', { reason, promise });
  process.exit(1);
});

// Database connection and server start
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Start the server
    const server = app.listen(port, () => {
      info(`Server is running on port ${port}`, {
        port,
        environment: process.env.NODE_ENV || 'development',
        nodeVersion: process.version,
        timestamp: new Date().toISOString()
      });
    });

    // Handle server errors
    server.on('error', (err) => {
      error('Server error', { error: err.message, stack: err.stack });
      process.exit(1);
    });

    return server;
    
  } catch (err) {
    error('Failed to start server', { error: err.message, stack: err.stack });
    process.exit(1);
  }
};

// Start the application
startServer().catch((err) => {
  error('Application startup failed', { error: err.message, stack: err.stack });
  process.exit(1);
});

module.exports = app;