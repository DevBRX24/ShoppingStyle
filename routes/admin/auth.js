const express = require('express');
const { check } = require('express-validator');
const usersRepo = require('../../repositories/user');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

// create router to link in index.js
const router = express.Router();

// Route Handler
// GET watch for incoming request
// Forward slash watch for incoming route or path
router.get(
  '/signup',
  [check('email').isEmail(), check('password'), check('passwordConfirmation')],
  async (req, res) => {
    res.send(signupTemplate({ req }));
  }
);

router.post('/signup', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send('Email in use');
  }

  if (password !== passwordConfirmation) {
    return res.send('Password must match');
  }

  // Create a user in server repo to represent this person
  const user = await usersRepo.create({ email, password });

  // Installed third party library to manage cookie
  // npm install cookie-session

  // Store the id of that user inside the users cookie
  req.session.userID = user.id;

  res.send('Account created');
});

// When user is logged out session will be clear
router.get('/signout', (req, res) => {
  req.session = null;
  res.send('You are logged out');
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate());
});

// When user is sign in Email and Password will validate
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    return res.send('Email not Found');
  }

  const validPassword = await usersRepo.comparePasswords(
    user.password,
    password
  );

  if (!validPassword) {
    return res.send('Invalid Password');
  }

  req.session.userID = user.id;

  res.send('You are signed in');
});

// This file will be avaible inside the project
module.exports = router;
