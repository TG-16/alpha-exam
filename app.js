const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/../utils/.env" });
const routes = require("./routes/route.js");
const morgan = require("morgan");
const app = express();
// const session = require("express-session");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
// app.use(express.urlencoded({ extended: true }));
// app.use(session({
//   secret: 'teddy-secret',
//   resave: false,
//   saveUninitialized: true
// }));

// Routes
app.use(routes);

// Root health check
app.get("/", (req, res) => {
  res.send("Freshman Exam Backend API running ✅");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//Check MySQL connection
// const pool = require("./models/db");
