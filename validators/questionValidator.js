const { check, validationResult } = require("express-validator");

exports.questionRules = [
  check("university_id")
    .isInt({ gt: 0 })
    .withMessage("University ID must be a positive integer"),
  check("stream_id")
    .isInt({ gt: 0 })
    .withMessage("Stream ID must be a positive integer"),
  check("year_id").isInt({ gt: 2000 }).withMessage("Year must be after 2000"),
  check("subject_id")
    .isInt({ gt: 0 })
    .withMessage("Subject ID must be a positive integer"),
  check("semester_id")
    .isInt({ min: 1, max: 2 })
    .withMessage("Semester must be 1 or 2"),
  check("exam_id")
    .isInt({ min: 1, max: 2 })
    .withMessage("Exam ID must be 1 or 2"),
];

exports.validateQuestion = (req, res, next) => {
  if (!req.is("application/json")) {
    return res.status(400).json({ message: "Request must be in JSON format" });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};
