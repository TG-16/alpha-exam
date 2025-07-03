const db = require("../models/db");

const addSemisters = (user_id, stream_id, semister_id) => {

  const sql = 'INSERT INTO user_stream_semester (user_id, stream_id, semester_id) VALUES (?, ?, ?)';
  const values = [user_id, stream_id, semister_id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Failed to insert semester:", err.message);
      // DO NOT respond here
    } else {
      console.log("Semester saved:", result.insertId);
    }
  });
};

module.exports = addSemisters;
