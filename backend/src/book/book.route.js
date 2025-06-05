// Api for book
const express = require('express');
const router = express.Router();
const { createModuleLogger } = require('../config/logger');

const logger = createModuleLogger('books');

// Import Statements for controller
const {
  postAbook, getAllBooks, getSingleBook, updateBook, deleteBook
} = require('./bookcontroller');

logger.info('Book routes initialized');

// Post a book
router.post('/create-book', postAbook);

// Get all books
router.get('/', getAllBooks);

// Single book endpoint
router.get('/:id', getSingleBook);

// Update a book endpoint
router.put('/edit/:id', updateBook);

// delete a book endpoint
router.delete('/:id', deleteBook);

module.exports = router;
