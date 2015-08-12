var express = require('express');
var passport = require('passport');
var User = require('../models/User');
var router = express.Router();
var usersController = require('../controllers/usersController');
var sessionsController = require('../controllers/sessionsController');
var commentsController = require('../controllers/commentsController');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {user: req.user});
});

// GET Registration page
router.get('/register', function (req, res) {
  res.render('auth/register');
});

// CREATE new user

router.post('/register', usersController.registerNewUser);

// GET Login page

router.get('/login', sessionsController.renderLoginPage);

// User Login

router.post('/login', passport.authenticate(
  'local',
  {
    failureRedirect: '/login'
  }),
    sessionsController.loginUser
);

// User Logout

router.get('/logout', sessionsController.logout);

// router.get('/secret', isLoggedIn, function (req, res) {
//   res.render('secret', {user: req.user});
// });

// GET Comments

router.get('/comments/index', commentsController.showComments);

module.exports = router;
