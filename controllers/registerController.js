const db = require("../models/db");
const path = require("path");
const fs = require("fs");

const registerController = (req, res) => {
    const { email, password, uploadedFileName, streams, semisters} = req.body;
    const filePath = path.join(__dirname, "..", "images", "paymentPic", uploadedFileName);

    if (!uploadedFileName) {
        return res.status(400).json({ error: "Payment photo is required." });
    }

    const fullPhotoPath = path.join("images", "paymentPic", uploadedFileName);
    const stringifyStreams = JSON.stringify(streams);
    const stringifySemisters = JSON.stringify(semisters);

    const sql = 'INSERT INTO users (email, password,photo_url, streams, semisters) VALUES (?, ?, ?, ?, ?)';
    const values = [email, password, fullPhotoPath, stringifyStreams, stringifySemisters];

    db.query(sql, values, (err, result) => {
        if (err) {
        console.error('DB insert error:', err);
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) console.error("Failed to delete file after DB error:", unlinkErr);
        });
        return res.status(500).json({ error: 'Failed to register user.' });
        }

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    });
}

module.exports = registerController;