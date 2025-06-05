const { createModuleLogger } = require('../config/logger');
const { checkDBHealth, getDBStats } = require('../config/database');

const logger = createModuleLogger('errorHandler');

// Global error handler
const globalErrorHandler = (err, req, res, _next) => {
  // Set default error status and message
  let status = err.statusCode || err.status || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || null;

  // Log the error
  logger.error('Global error handler caught error', {
    error: message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: req.user?.uid || null,
    body: req.body,
    query: req.query,
    params: req.params
  });

  // Handle specific error types
  if (err.name === 'ValidationError') {
    // Mongoose validation error
    status = 400;
    message = 'Validation Error';
    errors = Object.values(err.errors).map(error => ({
      field: error.path,
      message: error.message,
      value: error.value
    }));
  } else if (err.name === 'CastError') {
    // Mongoose cast error (invalid ObjectId)
    status = 400;
    message = 'Invalid ID format';
  } else if (err.code === 11000) {
    // MongoDB duplicate key error
    status = 400;
    message = 'Duplicate field value';
    const field = Object.keys(err.keyValue)[0];
    errors = [{
      field,
      message: `${field} already exists`,
      value: err.keyValue[field]
    }];
  } else if (err.name === 'JsonWebTokenError') {
    // JWT error
    status = 401;
    message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    // JWT expired
    status = 401;
    message = 'Token expired';
  } else if (err.type === 'entity.parse.failed') {
    // JSON parse error
    status = 400;
    message = 'Invalid JSON in request body';
  } else if (err.type === 'entity.too.large') {
    // Request entity too large
    status = 413;
    message = 'Request entity too large';
  }

  // Prepare error response
  const errorResponse = {
    error: true,
    message,
    timestamp: new Date().toISOString(),
    path: req.url,
    method: req.method
  };

  // Add errors array if available
  if (errors) {
    errorResponse.errors = errors;
  }

  // Add stack trace in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  // Add request ID if available
  if (req.id) {
    errorResponse.requestId = req.id;
  }

  res.status(status).json(errorResponse);
};

// 404 Not Found handler
const notFoundHandler = (req, res) => {
  const message = `Route ${req.originalUrl} not found`;
  
  logger.warn('404 Not Found', {
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  res.status(404).json({
    error: true,
    message,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method,
    availableEndpoints: [
      'GET /health',
      'GET /api/health',
      'GET /api/books',
      'POST /api/auth/admin',
      'GET /api/listings',
      'POST /api/listings',
      'GET /api/admin'
    ]
  });
};

// Health check endpoint
const healthCheck = async (req, res) => {
  try {
    const dbHealth = await checkDBHealth();
    const dbStats = await getDBStats();
    
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
      },
      database: dbHealth,
      services: {
        api: 'healthy',
        database: dbHealth.status
      }
    };

    // Add database statistics if available
    if (dbStats) {
      health.database.stats = dbStats;
    }

    // Check if any service is unhealthy
    const isUnhealthy = dbHealth.status === 'unhealthy';
    
    if (isUnhealthy) {
      health.status = 'unhealthy';
      return res.status(503).json(health);
    }

    res.status(200).json(health);
    
  } catch (error) {
    logger.error('Health check failed', { error: error.message, stack: error.stack });
    
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      details: error.message
    });
  }
};

// Async error wrapper
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Custom error class
class AppError extends Error {
  constructor(message, statusCode, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Error factory functions
const createValidationError = (message, errors) => new AppError(message, 400, errors);
const createAuthError = (message = 'Authentication failed') => new AppError(message, 401);
const createForbiddenError = (message = 'Access forbidden') => new AppError(message, 403);
const createNotFoundError = (message = 'Resource not found') => new AppError(message, 404);
const createConflictError = (message = 'Resource conflict') => new AppError(message, 409);
const createServerError = (message = 'Internal server error') => new AppError(message, 500);

module.exports = {
  globalErrorHandler,
  notFoundHandler,
  healthCheck,
  asyncHandler,
  AppError,
  createValidationError,
  createAuthError,
  createForbiddenError,
  createNotFoundError,
  createConflictError,
  createServerError
}; 