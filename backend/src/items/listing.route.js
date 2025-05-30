const listing = require('./listing.model');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');

// Import Statements for controller
const controller = require('./listingController.js');

router.post('/create-listing', auth, controller.createListing);

module.exports = router;
