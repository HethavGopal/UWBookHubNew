// Api for book
const Book = require('./book.model');
const express = require('express');
const router = express.Router();


// Import Statments for controller
const controller = require('./bookcontroller');
console.log('Imported controller:', controller); // Debug log

// Post Book:
router.post('/create-book', controller.postAbook)

// Get all books:
router.get("/", controller.getAllBooks)

// single book end point
router.get("/:id", controller.getSingleBook)


// update a book endpoint
router.put("/edit/:id", controller.updateBook)

// delete a book endpoint
router.delete("/:id", controller.deleteBook)

module.exports = router;
