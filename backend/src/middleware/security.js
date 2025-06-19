const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss');
const hpp = require('hpp');
const { createModuleLogger } = require('../config/logger');

const logger = createModuleLogger('security');

// Security middleware using Helmet
const securityMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});

// Rate limiting configurations
const rateLimiters = {
  // General API rate limiter
  general: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
      error: 'Too many requests from this IP, please try again later.',
      retryAfter: '15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      logger.warn('Rate limit exceeded', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
        method: req.method
      });
      res.status(429).json({
        error: 'Too many requests from this IP, please try again later.',
        retryAfter: '15 minutes'
      });
    }
  }),

  // Authentication rate limiter (stricter)
  auth: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 auth requests per windowMs
    message: {
      error: 'Too many authentication attempts, please try again later.',
      retryAfter: '15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    handler: (req, res) => {
      logger.warn('Auth rate limit exceeded', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
        method: req.method
      });
      res.status(429).json({
        error: 'Too many authentication attempts, please try again later.',
        retryAfter: '15 minutes'
      });
    }
  }),

  // Create listing rate limiter
  createListing: rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // Limit each IP to 20 listing creations per hour
    message: {
      error: 'Too many listing creation attempts, please try again later.',
      retryAfter: '1 hour'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      logger.warn('Create listing rate limit exceeded', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
        method: req.method
      });
      res.status(429).json({
        error: 'Too many listing creation attempts, please try again later.',
        retryAfter: '1 hour'
      });
    }
  }),

  // File upload rate limiter
  fileUpload: rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 50, // Limit each IP to 50 file uploads per hour
    message: {
      error: 'Too many file upload attempts, please try again later.',
      retryAfter: '1 hour'
    },
    standardHeaders: true,
    legacyHeaders: false
  })
};

// CORS configuration
const getCorsOptions = () => {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174',
    'https://uw-bookhub-new.vercel.app',
    'https://uwaterloomarketplace.vercel.app',
    // Add your specific Vercel deployment URL
    'https://uw-book-hub-4a2ipkl8d-hethavgopals-projects.vercel.app',
    // Pattern for Vercel preview URLs
    /^https:\/\/uw-book-hub-[a-z0-9]+-hethavgopals-projects\.vercel\.app$/,
    // Pattern for any Vercel deployment under your account
    /^https:\/\/[a-z0-9-]+-hethavgopals-projects\.vercel\.app$/
  ];

  // Add environment-specific origins
  if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
  }

  if (process.env.NODE_ENV === 'development') {
    // Allow all localhost ports in development
    allowedOrigins.push(/^http:\/\/localhost:\d+$/);
  }

  return {
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      const isAllowed = allowedOrigins.some(allowedOrigin => {
        if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin);
        }
        return allowedOrigin === origin;
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        logger.warn('CORS blocked origin', { 
          origin, 
          userAgent: 'Unknown',
          allowedOrigins: allowedOrigins.map(o => o.toString())
        });
        // In production, be more permissive to avoid blocking legitimate requests
        if (process.env.NODE_ENV === 'production') {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Cache-Control',
      'X-Real-IP',
      'X-Forwarded-For',
      'X-Forwarded-Proto'
    ],
    optionsSuccessStatus: 200,
    maxAge: 86400 // 24 hours
  };
};

// Custom MongoDB injection protection (Express 5.x compatible)
const mongoSanitizationMiddleware = (req, res, next) => {
  // Custom sanitization for Express 5.x compatibility
  const sanitizeValue = (value) => {
    if (typeof value === 'string') {
      // Remove MongoDB operators
      return value.replace(/^\$/, '_');
    }
    if (typeof value === 'object' && value !== null) {
      const sanitized = {};
      for (const key in value) {
        const sanitizedKey = key.replace(/^\$/, '_').replace(/\./g, '_');
        sanitized[sanitizedKey] = sanitizeValue(value[key]);
      }
      return sanitized;
    }
    return value;
  };

  // Sanitize body
  if (req.body && typeof req.body === 'object') {
    try {
      req.body = sanitizeValue(req.body);
    } catch (error) {
      logger.warn('MongoDB sanitization failed for body', { error: error.message });
    }
  }

  // Sanitize params
  if (req.params && typeof req.params === 'object') {
    try {
      for (const key in req.params) {
        req.params[key] = sanitizeValue(req.params[key]);
      }
    } catch (error) {
      logger.warn('MongoDB sanitization failed for params', { error: error.message });
    }
  }

  next();
};

// XSS protection middleware
const xssProtection = (req, res, next) => {
  // Sanitize request body
  if (req.body && typeof req.body === 'object') {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key]);
      }
    }
  }

  // Sanitize query parameters
  if (req.query && typeof req.query === 'object') {
    for (const key in req.query) {
      if (typeof req.query[key] === 'string') {
        req.query[key] = xss(req.query[key]);
      }
    }
  }

  next();
};

// HTTP Parameter Pollution protection
const hppProtection = hpp({
  whitelist: ['category', 'tags', 'sort'] // Allow these parameters to be arrays
});

// Combined security middleware
const applySecurity = [
  securityMiddleware,
  mongoSanitizationMiddleware,
  xssProtection,
  hppProtection
];

module.exports = {
  securityMiddleware: applySecurity,
  getCorsOptions,
  rateLimiters,
  mongoSanitizationMiddleware,
  xssProtection,
  hppProtection
}; 