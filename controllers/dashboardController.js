// controllers/dashboardController.js
const db = require('../models/db');

const dashboardController = (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT 
  subject.name AS subject_name,
  exam.type AS exam_type,
  ROUND((AVG(score.score) / 40) * 100, 2) AS average_score
FROM score
JOIN subject ON score.subject_id = subject.subj_id
JOIN exam ON score.exam_id = exam.exam_id
WHERE score.user_id = ?
GROUP BY subject.subj_id, exam.type
ORDER BY exam.type, subject.name;

  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Dashboard Query Error:', err);
      return res.status(500).json({
        success: false,
        message: 'Something went wrong while fetching dashboard data.'
      });
    }

    // Format response into Mid and Final
    const formatted = {
      Mid: [],
      Final: []
    };

    results.forEach(row => {
      if (row.exam_type === 'mid') {
        formatted.Mid.push({
          subject: row.subject_name,
          average: row.average_score
        });
      } else if (row.exam_type === 'final') {
        formatted.Final.push({
          subject: row.subject_name,
          average: row.average_score
        });
      }
    });

    res.json({
      success: true,
      data: formatted
    });
  });
};

module.exports = dashboardController;
