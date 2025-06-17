const db = require('../models/db');
const path = require('path');

const updateExistingUser = (req, res, next) => {
    const { email, password, uploadedFileName, streams, semisters, status } = req.body;

    const userCheckQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(userCheckQuery, [email], (err, results) => {
        if (err) {
            console.error("DB query error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (results.length > 0 && results[0].status === 'Invalid') {
            if (!uploadedFileName) {
                return res.status(400).json({ error: "Payment photo is required." });
            }

            const fullPhotoPath = path.join("images", "paymentPic", uploadedFileName);
            const stringifyStreams = JSON.stringify(streams);
            const stringifySemisters = JSON.stringify(semisters);

            const updateQuery = `UPDATE users 
                SET email = ?, password = ?, photo_url = ?, status = ?, streams = ?, semisters = ?
                WHERE email = ?`;

            db.query(updateQuery, [email, password, fullPhotoPath, status, stringifyStreams, stringifySemisters, email], (err, result) => {
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
