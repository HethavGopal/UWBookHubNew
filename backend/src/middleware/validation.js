const Joi = require('joi');
const { createModuleLogger } = require('../config/logger');

const logger = createModuleLogger('validation');

// Base validation schemas
const schemas = {
  // User validation
  userRegistration: Joi.object({
    email: Joi.string().email().required().max(255),
    password: Joi.string().min(6).max(128).required(),
    username: Joi.string().alphanum().min(3).max(30).optional()
  }),

  userLogin: Joi.object({
    email: Joi.string().email().required().max(255),
    password: Joi.string().required().max(128)
  }),

  adminLogin: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).max(128).required()
  }),

  // Listing validation
  createListing: Joi.object({
    title: Joi.string().min(5).max(200).required().trim(),
    description: Joi.string().min(10).max(2000).required().trim(),
    price: Joi.number().positive().max(100000).required(),
    category: Joi.string().valid(
      'textbooks', 'electronics', 'dorm', 'clothing', 
      'sports', 'gadgets', 'transport', 'misc'
    ).required(),
    condition: Joi.string().valid('new', 'like-new', 'good', 'fair').required(),
    location: Joi.string().max(100).optional().trim(),
    email: Joi.string().email().required().max(255),
    images: Joi.array().items(Joi.string().uri()).max(5).optional(),
    status: Joi.string().valid('active', 'sold', 'inactive').default('active')
  }),

  updateListing: Joi.object({
    title: Joi.string().min(5).max(200).optional().trim(),
    description: Joi.string().min(10).max(2000).optional().trim(),
    price: Joi.number().positive().max(100000).optional(),
    category: Joi.string().valid(
      'textbooks', 'electronics', 'dorm', 'clothing', 
      'sports', 'gadgets', 'transport', 'misc'
    ).optional(),
    condition: Joi.string().valid('new', 'like-new', 'good', 'fair').optional(),
    location: Joi.string().max(100).optional().trim(),
    status: Joi.string().valid('active', 'sold', 'inactive').optional()
  }),

  // Book validation (for the book store part)
  createBook: Joi.object({
    title: Joi.string().min(1).max(300).required().trim(),
    description: Joi.string().max(2000).optional().trim(),
    category: Joi.string().max(50).required().trim(),
    trending: Joi.boolean().default(false),
    coverImage: Joi.string().max(500).optional().trim(),
    oldPrice: Joi.number().positive().max(10000).required(),
    newPrice: Joi.number().positive().max(10000).required()
  }),

  // Query parameter validation
  listingQuery: Joi.object({
    page: Joi.number().integer().min(1).max(1000).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    category: Joi.string().valid(
      'all', 'textbooks', 'electronics', 'dorm', 'clothing', 
      'sports', 'gadgets', 'transport', 'misc'
    ).default('all'),
    condition: Joi.string().valid('all', 'new', 'like-new', 'good', 'fair').default('all'),
    sort: Joi.string().valid('newest', 'oldest', 'price-low', 'price-high', 'title', 'random').default('newest'),
    search: Joi.string().max(100).optional().trim(),
    minPrice: Joi.number().min(0).max(99999).optional(),
    maxPrice: Joi.number().min(0).max(100000).optional(),
    location: Joi.string().max(100).optional().trim()
  }),

  // MongoDB ObjectId validation
  objectId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),

  // Email validation
  email: Joi.object({
    to: Joi.string().email().required(),
    subject: Joi.string().min(1).max(200).required().trim(),
    message: Joi.string().min(10).max(5000).required().trim(),
    from: Joi.string().email().optional()
  }),

  // File upload validation
  fileUpload: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    mimetype: Joi.string().valid(
      'image/jpeg', 'image/png', 'image/webp', 'image/gif'
    ).required(),
    size: Joi.number().max(5 * 1024 * 1024) // 5MB limit
  }),

  // Order validation
  createOrder: Joi.object({
    name: Joi.string().min(2).max(100).required().trim(),
    email: Joi.string().email().required().max(255),
    phone: Joi.string().pattern(/^[+]?[1-9][\d]{0,15}$/).required(),
    address: Joi.object({
      street: Joi.string().min(5).max(200).required().trim(),
      city: Joi.string().min(2).max(100).required().trim(),
      state: Joi.string().min(2).max(100).required().trim(),
      country: Joi.string().min(2).max(100).required().trim(),
      zipcode: Joi.string().pattern(/^[A-Za-z0-9\s-]{3,10}$/).required()
    }).required(),
    productsIds: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)).min(1).required(),
    totalPrice: Joi.number().positive().max(100000).required()
  })
};

// Validation middleware factory
const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const data = source === 'body' ? req.body : 
      source === 'query' ? req.query : 
        source === 'params' ? req.params : req[source];

    const { error, value } = schema.validate(data, {
      abortEarly: false, // Show all validation errors
      allowUnknown: false, // Don't allow unknown fields
      stripUnknown: true // Remove unknown fields
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context.value
      }));

      logger.warn('Validation failed', {
        source,
        errors,
        originalData: data,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });

      return res.status(400).json({
        error: 'Validation failed',
        details: errors
      });
    }

    // Replace the original data with validated/sanitized data
    if (source === 'body') req.body = value;
    else if (source === 'query') req.query = value;
    else if (source === 'params') req.params = value;

    next();
  };
};

// Specific validation middlewares
const validateUserRegistration = validate(schemas.userRegistration);
const validateUserLogin = validate(schemas.userLogin);
const validateAdminLogin = validate(schemas.adminLogin);
const validateCreateListing = validate(schemas.createListing);
const validateUpdateListing = validate(schemas.updateListing);
const validateCreateBook = validate(schemas.createBook);
const validateListingQuery = validate(schemas.listingQuery, 'query');
const validateObjectId = (paramName = 'id') => validate(Joi.object({ [paramName]: schemas.objectId }), 'params');
const validateEmail = validate(schemas.email);
const validateCreateOrder = validate(schemas.createOrder);

// File validation middleware
const validateFileUpload = (req, res, next) => {
  if (!req.file && !req.files) {
    return next();
  }

  const files = req.files || [req.file];
  
  for (const file of files) {
    const { error } = schemas.fileUpload.validate(file);
    if (error) {
      logger.warn('File validation failed', {
        error: error.details[0].message,
        file: {
          fieldname: file.fieldname,
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size
        },
        ip: req.ip
      });

      return res.status(400).json({
        error: 'File validation failed',
        message: error.details[0].message
      });
    }
  }

  next();
};

// Custom validation for price range
const validatePriceRange = (req, res, next) => {
  const { minPrice, maxPrice } = req.query;
  
  if (minPrice && maxPrice && parseFloat(minPrice) > parseFloat(maxPrice)) {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Minimum price cannot be greater than maximum price'
    });
  }
  
  next();
};

// Sanitize HTML content
const sanitizeHtml = (req, res, next) => {
  const fieldsToSanitize = ['title', 'description', 'message', 'name'];
  
  for (const field of fieldsToSanitize) {
    if (req.body[field] && typeof req.body[field] === 'string') {
      // Remove HTML tags and encode special characters
      req.body[field] = req.body[field]
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/[<>]/g, '') // Remove remaining brackets
        .trim();
    }
  }
  
  next();
};

module.exports = {
  schemas,
  validate,
  validateUserRegistration,
  validateUserLogin,
  validateAdminLogin,
  validateCreateListing,
  validateUpdateListing,
  validateCreateBook,
  validateListingQuery,
  validateObjectId,
  validateEmail,
  validateCreateOrder,
  validateFileUpload,
  validatePriceRange,
  sanitizeHtml
}; 