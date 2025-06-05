const mongoose = require('mongoose');
const { createModuleLogger } = require('./logger');

const logger = createModuleLogger('database');

// Database configuration options
const dbOptions = {
  // Connection settings
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  
  // Buffering settings
  bufferCommands: false, // Disable mongoose buffering
  
  // Monitoring settings
  heartbeatFrequencyMS: 10000, // Send a ping every 10 seconds
  
  // Error handling
  retryWrites: true,
  retryReads: true,
  
  // Performance optimizations
  autoIndex: process.env.NODE_ENV !== 'production', // Don't build indexes in production
  autoCreate: process.env.NODE_ENV !== 'production' // Don't auto-create collections in production
};

// Connection events
mongoose.connection.on('connected', () => {
  logger.info('Database connected successfully', { 
    host: mongoose.connection.host,
    port: mongoose.connection.port,
    name: mongoose.connection.name
  });
});

mongoose.connection.on('error', (err) => {
  logger.error('Database connection error', { error: err.message, stack: err.stack });
});

mongoose.connection.on('disconnected', () => {
  logger.warn('Database disconnected');
});

// Handle application termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    logger.info('Database connection closed through app termination');
    process.exit(0);
  } catch (error) {
    logger.error('Error closing database connection', { error: error.message });
    process.exit(1);
  }
});

// Connection function with retry logic
const connectDB = async (retries = 5) => {
  const dbUrl = process.env.DB_URL;
  
  if (!dbUrl) {
    logger.error('Database URL not provided in environment variables');
    process.exit(1);
  }

  for (let i = 0; i < retries; i++) {
    try {
      logger.info(`Attempting to connect to database (attempt ${i + 1}/${retries})`);
      
      await mongoose.connect(dbUrl, dbOptions);
      
      logger.info('Database connection established successfully');
      return;
      
    } catch (error) {
      logger.error(`Database connection attempt ${i + 1} failed`, { 
        error: error.message,
        attempt: i + 1,
        maxRetries: retries
      });
      
      if (i === retries - 1) {
        logger.error('All database connection attempts failed. Exiting...');
        process.exit(1);
      }
      
      // Wait before retrying (exponential backoff)
      const delay = Math.min(1000 * Math.pow(2, i), 10000);
      logger.info(`Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Health check function
const checkDBHealth = async () => {
  try {
    await mongoose.connection.db.admin().ping();
    return { status: 'healthy', timestamp: new Date().toISOString() };
  } catch (error) {
    logger.error('Database health check failed', { error: error.message });
    return { status: 'unhealthy', error: error.message, timestamp: new Date().toISOString() };
  }
};

// Get database statistics
const getDBStats = async () => {
  try {
    const stats = await mongoose.connection.db.stats();
    return {
      collections: stats.collections,
      dataSize: stats.dataSize,
      storageSize: stats.storageSize,
      indexes: stats.indexes,
      indexSize: stats.indexSize,
      objects: stats.objects
    };
  } catch (error) {
    logger.error('Failed to get database statistics', { error: error.message });
    return null;
  }
};

module.exports = {
  connectDB,
  checkDBHealth,
  getDBStats,
  mongoose
}; 