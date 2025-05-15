const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config()


// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
  
// Import Statments for controller

const bookRoute = require('./src/book/book.route');


// Routes
app.use("/api/books", bookRoute);




async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use('/', (req, res) => {
    res.send('Hello World!');
  });
}

main().then(() => console.log("Working")).catch(err => console.log(err));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });