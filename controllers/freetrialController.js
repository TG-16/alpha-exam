const db = require("../models/db");

const freetrialController = (req, res) => {
    const 
    university_id = 1,
    stream_id = 1,
    year_id = 1,
    subject_id = 1,
    semester_id = 1,
    exam_id =11;

  const sql = `SELECT question_id, question, choices, answer, description
               FROM questions WHERE university_id = ? AND stream_id = ? AND year_id = ?
               AND subject_id = ? AND semester_id = ? AND exam_id = ?`;
  const values = [
    university_id,
    stream_id,
    year_id,
    subject_id,
    semester_id,
    exam_id,
  ];
  db.query(sql, values, (err, rows) => {
    if (err) {
      console.error("Question fetch error:", err);
      return res
        .status(500)
        .json({ message: "Database error while fetching questions" });
    }
    res.status(200).json({ questions: rows });
  });
}

module.exports = freetrialController;