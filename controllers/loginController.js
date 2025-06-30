const db = require('../models/db');

const loginController = (req,res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const values = [email, password];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('DB query error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];

        if (user.status === 'Inactive') {
            // route to free trial page
            console.log("free trial page");
            return res.status(403).json({ error: 'Your account is inactive. Please wait for the 24hr validation time.' });
        }

        if (user.status === "Invalid") {
            // route to signup page with user data
            console.log("signup page");
            return res.status(201).json({message: "invalid payment detail", user});
        }


        // Redirect to dashboard after successful login res.redirect('/dashboard'); 
        res.status(200).json({message: 'Login successful', user});
    });
}

module.exports = loginController;