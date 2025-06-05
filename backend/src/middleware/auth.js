// Temporary auth middleware for testing (without Firebase Admin)
// TODO: Install firebase-admin and configure properly for production

const admin = require('firebase-admin');
const { createModuleLogger } = require('../config/logger');
const { createAuthError } = require('./errorHandler');

const logger = createModuleLogger('auth');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    // Parse private key properly (handle escaped newlines)
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : null;

    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
      throw new Error('Missing required Firebase environment variables');
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: privateKey,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL
      }),
      projectId: process.env.FIREBASE_PROJECT_ID
    });
        
    logger.info('Firebase Admin initialized successfully');
  } catch (error) {
    logger.error('Firebase Admin initialization failed', { 
      error: error.message,
      hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
      hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
      hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY
    });
    throw error;
  }
}

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
        
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.warn('Missing or invalid authorization header', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path
      });
      throw createAuthError('No valid authorization header provided');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      logger.warn('No token provided in authorization header', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path
      });
      throw createAuthError('No token provided');
    }

    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
        
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      name: decodedToken.name,
      picture: decodedToken.picture
      // Add other fields you need from the token
    };
        
    logger.info('User authenticated successfully', { 
      uid: req.user.uid,
      email: req.user.email,
      emailVerified: req.user.emailVerified,
      path: req.path
    });
        
    next();
        
  } catch (error) {
    logger.error('Token verification failed', { 
      error: error.message,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      path: req.path
    });
        
    // Handle different types of Firebase auth errors
    if (error.code === 'auth/id-token-expired') {
      throw createAuthError('Token has expired');
    } else if (error.code === 'auth/invalid-id-token') {
      throw createAuthError('Invalid token format');
    } else if (error.code === 'auth/argument-error') {
      throw createAuthError('Invalid token');
    } else if (error.statusCode) {
      // If it's already an AppError, just pass it along
      throw error;
    } else {
      throw createAuthError('Token verification failed');
    }
  }
};

// Optional authentication middleware (doesn't throw error if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
        
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return next();
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
        
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      name: decodedToken.name,
      picture: decodedToken.picture
    };
        
    logger.info('Optional authentication successful', { 
      uid: req.user.uid,
      email: req.user.email
    });
        
  } catch (error) {
    logger.warn('Optional authentication failed', { 
      error: error.message,
      ip: req.ip
    });
    // Don't throw error for optional auth
  }
    
  next();
};

module.exports = { auth, optionalAuth };
