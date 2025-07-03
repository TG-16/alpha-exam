const db = require("../models/db");
const path = require("path");
const fs = require("fs");
const addSemisters = require("../utils/addSemisters");
const bcrypt = require('bcrypt');


const registerController = (req, res) => {
    //semisters and streams has to be modified
    const { email } = req.body;
    let { password, selectedSemesters } = req.body;
    const uploadedFileName = req.file?.filename;

    
  // Parse selectedSemesters if it's a string
  try {
    if (typeof selectedSemesters === 'string') {
      selectedSemesters = JSON.parse(selectedSemesters);
    }
  } catch (err) {
    console.error("❌ Failed to parse selectedSemesters:", err.message);
    return res.status(400).json({ error: "Invalid selectedSemesters format." });
  }

    const filePath = path.join(__dirname, "..", "images", "paymentPic", uploadedFileName);//name matching for the image f vs b

    if (!uploadedFileName) {
        return res.status(400).json({ error: "Payment photo is required." });
    }

    const fullPhotoPath = path.join("images", "paymentPic", uploadedFileName);

    const sql = 'INSERT INTO users (email, password, photo_url) VALUES (?, ?, ?)';

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
        return res.status(500).json({ error: "Failed to hash password" });
        }
        password = hashedPassword;  

    const values = [email, password, fullPhotoPath];

    db.query(sql, values, (err, result) => {
        if (err) {
        console.error('DB insert error:', err);
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) console.error("Failed to delete file after DB error:", unlinkErr);
        });
        return res.status(500).json({ error: 'Failed to register user.' });
        }

        if(selectedSemesters.natural1) addSemisters( result.insertId, 1, 1);

        if(selectedSemesters.natural2) addSemisters( result.insertId, 1, 2);

        if(selectedSemesters.social1) addSemisters( result.insertId, 2, 1);

        if(selectedSemesters.social2) addSemisters( result.insertId, 2, 2);

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    });
    });

    
}

module.exports = registerController;