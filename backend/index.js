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
const userRoute = require('./src/users/user.route');
// Routes
app.use("/api/books", bookRoute);
app.use("/api/auth", userRoute);

// Root route - only matches exact '/' path
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Database connection and server start
async function main() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully");
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Database connection error:", error);
    process.exit(1);
  }
}

main().catch(err => console.log(err));