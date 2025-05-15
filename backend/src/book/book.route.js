// Api for book

const express = require('express');
const router = express.Router();


// Import Statments for controller

// Post Book:


router.post('/create-book', async (req, res) => {
      console.log(req.body);
})





module.exports = router;
