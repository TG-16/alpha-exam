const express = require('express');
const router = express.Router();

const registerController = require('../controllers/registerController');
const registerValidator = require('../validators/registerValidator');
const updateExistingUser = require('../utils/updateExistingUser');
const loginController = require('../controllers/loginController');
const loginValidator = require('../validators/loginValidator');
const upload = require('../utils/multer');

//Register route
router.post('/signup' ,upload.single("paymentPhoto")  ,registerValidator ,updateExistingUser ,  registerController);
router.post("/login", loginValidator, loginController);

router.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the registration API" });
});


module.exports = router;
