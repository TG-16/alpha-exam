const db = require('../models/db');
const path = require('path');

const updateExistingUser = (req, res, next) => {
    //email also must be sent to the b from f
    const { email } = req.body;
    let { password } = req.body;
    const uploadedFileName = req.file?.filename;
    const status = 'inactive';

    const userCheckQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(userCheckQuery, [email], (err, results) => {
        if (err) {
            console.error("DB query error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (results.length > 0 && results[0].status === 'Invalid') {
            if (!uploadedFileName) {
                return res.status(400).json({ error: "Payment photo is required1." });
            }

            const fullPhotoPath = path.join("images", "paymentPic", uploadedFileName);

            const updateQuery = `UPDATE users 
                SET password = ?, photo_url = ?, status = ?
                WHERE email = ?`;

            const saltRounds = 10;
            bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
                    if (err) {
                    return res.status(500).json({ error: "Failed to hash password" });
                    password = hashedPassword;
            }});

            db.query(updateQuery, [password, fullPhotoPath, status, email], (err, result) => {
                if (err) {
                    console.error("Update error:", err);
                    return res.status(500).json({ message: "Update failed" });
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "User not found or no changes made" });
                }

                return res.status(200).json({ message: "User updated successfully" });
            });

        } else {
            // Only call next() if user was not found or status wasn't 'Invalid'
            next();
        }
    });
};

module.exports = updateExistingUser;
