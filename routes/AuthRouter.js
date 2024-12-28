const { signup, login } = require('../contollers/AuthControllers');
const { signupValidation, loginValidation } = require('../middleware/AuthValidation');

const router = require('express').Router();

// loginValidation for serverside validation using 'joi' module
// login import from controller where we define logic

router.post('/login', loginValidation, login);

// signupValidation for serverside validation using 'joi' module
// signup import from controller where we define logic

router.post('/signup', signupValidation, signup);

module.exports = router;