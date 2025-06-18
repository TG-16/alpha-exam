const { check, validationResult } = require("express-validator");

exports.passwordRules = [
  check("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8 })
    .withMessage("Must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Must contain an uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Must contain a lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Must contain a number")
    .matches(/[@$!%*?&#]/)
    .withMessage("Must contain a special character"),
];

exports.validatePassword = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};
