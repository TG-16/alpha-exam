const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', routes);

// Root health check
app.get('/', (req, res) => {
res.send('Freshman Exam Backend API running ✅');
});

// Start server
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});

const pool = require('./models/db');

pool.query('SELECT 1')
.then(() => console.log('✅ MySQL Connected'))
.catch(err => console.error('DB connection error:', err));