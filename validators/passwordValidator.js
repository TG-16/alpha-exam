const { check, validationResult } = require("express-validator");

exports.passwordRules = [
  check("email").isEmail().normalizeEmail(),
  check("newPassword")
    .isLength({ min: 8 })
    .matches(/[A-Z]/)
    .matches(/[a-z]/)
    .matches(/[0-9]/)
    .matches(/[@$!%*?&#]/),
];

exports.validatePassword = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};
