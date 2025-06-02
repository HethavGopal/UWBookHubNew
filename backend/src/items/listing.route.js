const listing = require('./listing.model');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');

// Import Statements for controller
const controller = require('./listingController.js');

router.post('/create-listing', auth, controller.createListing);

router.get('/get-all-listings', controller.getAllListings);

router.get('/:id', controller.getSingleListing);

module.exports = router;
