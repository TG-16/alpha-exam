const express = require('express');
const router = express.Router();
const logout = require('../controllers/logoutController');
const passwordCh = require('../controllers/passwordChangeController');
const question = require('../controllers/questionController');
const score = require('../controllers/scoreController');

const registerController = require('../controllers/registerController');
const registerValidator = require('../validators/registerValidator');
const updateExistingUser = require('../utils/updateExistingUser');
const loginController = require('../controllers/loginController');
const loginValidator = require('../validators/loginValidator');
const upload = require('../utils/multer');

const authMW = require('../utils/auth');
const deviceCheck = require('../utils/deviceCheck');

const { questionRules, validateQuestion } = require('../validators/questionValidator');
const { scoreRules, validateScore } = require('../validators/scoreValidator');
const { passwordRules, validatePassword } = require('../validators/passwordValidator');

router.post('/logout', authMW, logout);
router.post('/change-password',authMW, passwordRules, validatePassword, passwordCh);
router.post('/questions/fetch', authMW, deviceCheck, questionRules, validateQuestion, question.fetch);
router.post('/scores/submit', authMW, deviceCheck, scoreRules, validateScore, score.submit);


//Register route
router.post('/signup' ,upload.single("paymentPhoto")  ,registerValidator ,updateExistingUser ,  registerController);
router.post("/login", loginValidator, loginController);

// router.get("/", (req, res) => {
//     res.status(200).json({ message: "Welcome to the registration API" });
// });


module.exports = router;
