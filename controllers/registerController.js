const db = require("../models/db");

const registerController = (req, res) => {
    const { email, password, confirmPassword, photoPath, amount, streams, semisters} = req.body;

    const sql = 'INSERT INTO users (email, password,photo_url) VALUES (?, ?, ?)';
    const values = [email, password, photoPath];

     db.query(sql, values, (err, result) => {
        if (err) {
        console.error('DB insert error:', err);
        return res.status(500).json({ error: 'Failed to register user.' });
        }

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    });
}

module.exports = registerController;