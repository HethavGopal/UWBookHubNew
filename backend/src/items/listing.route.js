const express = require('express');
const router = express.Router();
const { auth, optionalAuth } = require('../middleware/auth.js');
const { 
  validateCreateListing, 
  validateUpdateListing, 
  validateListingQuery,
  validateObjectId,
  sanitizeHtml 
} = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');

// Import controller
const controller = require('./listingController.js');

// Create a new listing (authenticated users only)
router.post('/create-listing', 
  auth,
  sanitizeHtml,
  validateCreateListing,
  asyncHandler(controller.createListing)
);

// Get all listings (public, with optional auth for personalization)
router.get('/get-all-listings', 
  optionalAuth,
  validateListingQuery,
  asyncHandler(controller.getAllListings)
);

// Get single listing by ID (public)
router.get('/:id', 
  validateObjectId('id'),
  asyncHandler(controller.getSingleListing)
);

// Update listing (authenticated users only, owner or admin)
router.put('/:id', 
  auth,
  validateObjectId('id'),
  sanitizeHtml,
  validateUpdateListing,
  asyncHandler(controller.updateListing)
);

// Delete listing (authenticated users only, owner or admin)
router.delete('/:id', 
  auth,
  validateObjectId('id'),
  asyncHandler(controller.deleteListing)
);

// Get listings by user (authenticated users only)
router.get('/user/my-listings', 
  auth,
  validateListingQuery,
  asyncHandler(controller.getUserListings)
);

// Search listings (public, with optional auth)
router.get('/search/advanced', 
  optionalAuth,
  validateListingQuery,
  asyncHandler(controller.searchListings)
);

// Get listings by category (public, with optional auth)
router.get('/category/:category', 
  optionalAuth,
  validateListingQuery,
  asyncHandler(controller.getListingsByCategory)
);

// Mark listing as sold (authenticated users only, owner or admin)
router.patch('/:id/mark-sold', 
  auth,
  validateObjectId('id'),
  asyncHandler(controller.markAsSold)
);

// Get featured/trending listings (public)
router.get('/featured/trending', 
  optionalAuth,
  validateListingQuery,
  asyncHandler(controller.getFeaturedListings)
);

module.exports = router;
