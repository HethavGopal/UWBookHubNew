const listing = require('./listing.model');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');

// Import Statements for controller
const controller = require('./listingController.js');

router.post('/create-listing', auth, controller.createListing);

router.get('/get-all-listings', controller.getAllListings);

router.get('/user-listings', auth, controller.getUserListings);

router.get('/:id', controller.getSingleListing);

router.put('/:id', auth, controller.updateListing);

router.delete('/:id', auth, controller.deleteListing);

module.exports = router;
