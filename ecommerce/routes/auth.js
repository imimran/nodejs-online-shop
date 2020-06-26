const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post(
  '/signup',
  [
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email.'),

  body('password', 'Enter a password with 5 characters only number and text')
    .isLength({ min: 5})
    .isAlphanumeric(),
  body('confirmPassword').custom((value, { req}) =>{
      if(value !== req.body.password){
          throw new Error('Passwords not match')
      }
      return true
  })    
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);



module.exports = router;
