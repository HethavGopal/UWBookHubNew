// Load environment variables FIRST (before any other imports)
require('dotenv').config();

// Debug environment variables
console.log('🔍 Environment Variables Check:');
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing');
console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL ? '✅ Set' : '❌ Missing');
console.log('FIREBASE_PRIVATE_KEY:', process.env.FIREBASE_PRIVATE_KEY ? '✅ Set' : '❌ Missing');
console.log('DB_URL:', process.env.DB_URL ? '✅ Set' : '❌ Missing');
console.log('---');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const adminRoute = require('./src/stats/admin.stats');

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
  
// Import Statments for controller
const bookRoute = require('./src/book/book.route');
const userRoute = require('./src/users/user.route');
const itemRoute = require('./src/items/listing.route');
// Routes
app.use("/api/books", bookRoute);
app.use("/api/auth", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/listings", itemRoute)

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