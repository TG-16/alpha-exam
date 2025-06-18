const express = require('express');
const app = express();
require('dotenv').config({ path: __dirname + '/../utils/.env' });
const route = require("./routes/route.js");

// Middleware to parse JSON bodies
app.use(express.json());

// Basic Routes
app.use(route);

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
