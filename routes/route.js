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

console.log('question:', question);
console.log('passwordCh:', passwordCh);
console.log('score:', score);
console.log('logout:', logout);
console.log('registerController:', registerController);
console.log('registerValidator:', registerValidator);
console.log('updateExistingUser:', updateExistingUser);
console.log('loginController:', loginController);
console.log('loginValidator:', loginValidator);
console.log('authMW:', authMW);
console.log('deviceCheck:', deviceCheck);



router.post('/logout', authMW, logout.logout);
router.post('/change-password',authMW, passwordRules, validatePassword, passwordCh.changePassword);
router.post('/questions/fetch', authMW, deviceCheck, questionRules, validateQuestion, question.submit);
router.post('/scores/submit', authMW, deviceCheck, scoreRules, validateScore, score.fetch);


//Register route
router.post('/signup' ,upload.single("paymentPhoto")  ,registerValidator ,updateExistingUser ,  registerController);
router.post("/login", loginValidator, loginController);

// router.get("/", (req, res) => {
//     res.status(200).json({ message: "Welcome to the registration API" });
// });


module.exports = router;
