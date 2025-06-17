const pool = require('../models/db');

exports.fetch = async (req, res) => {
  const { university_id, stream_id, year_id, subject_id, semester_id, exam_id } = req.body;
  if (!university_id || !stream_id || !year_id || !subject_id || !semester_id || !exam_id) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  const [questions] = await pool.execute(
    'SELECT question_id, question, choices, answer, description FROM questions WHERE university_id = ? AND stream_id = ? AND year_id = ? AND subject_id = ? AND semester_id = ? AND exam_id = ?',
    [university_id, stream_id, year_id, subject_id, semester_id, exam_id]
  );
  res.json({ questions });
};