const db = require('../models/db');
const bcrypt = require('bcrypt');

const loginController = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  const values = [email];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('DB query error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password1' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Bcrypt error:', err);
        return res.status(500).json({ error: 'Password verification failed' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // ✅ Password is correct. Check account status
      if (user.status === 'Inactive') {
        console.log("free trial page");
        return res.status(403).json({
          inactive: 'Your account is inactive. Please wait for the 24hr validation time.'
        });
      }

      if (user.status === 'Invalid') {
        //user password must not be sent even if it is in  encrypted form
        console.log("signup page");
        return res.status(201).json({
          invalid: 'Invalid payment detail. Please complete registration again.',
          user
        });
      }

      // ✅ Successful login
      return res.status(200).json({
        success: 'Login successful',
        user
      });
    });
  });
};

module.exports = loginController;
