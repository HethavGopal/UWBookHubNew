const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()

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