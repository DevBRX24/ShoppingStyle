const express = require('express');

const { handleErrors } = require('./middlewares');
const usersRepo = require('../../repositories/user');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExists,
  validPasswordForUser,
} = require('./validator');

// create router to link in index.js
const router = express.Router();

// Route Handler
// GET watch for incoming request
// Forward slash watch for incoming route or path
router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

// The validation procedure is in the documentation of Express Validator
// Validation and Sanitization. The validation process is in validator.js
router.post(
  '/signup',
  [requireEmail, requirePassword, requirePasswordConfirmation],
  handleErrors(signupTemplate),
  async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;
    // Create a user in server repo to represent this person
    const user = await usersRepo.create({ email, password });
    // Installed third party library to manage cookie
    // npm install cookie-session
    // Store the id of that user inside the users cookie
    req.session.userID = user.id;

    res.send('Account created');
  }
);

// When user is logged out session will be clear
router.get('/signout', (req, res) => {
  req.session = null;
  res.send('You are logged out');
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate({}));
});

// When user is sign in Email and Password will validate
router.post(
  '/signin',
  [requireEmailExists, validPasswordForUser],
  handleErrors(signinTemplate),
  async (req, res) => {
    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email });

    req.session.userID = user.id;

    res.send('You are signed in');
  }
);

// This file will be avaible inside the project
module.exports = router;
