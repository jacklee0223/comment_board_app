var express = require('express');
var passport = require('passport');
var User = require('../models/User');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {user: req.user});
});

router.get('/register', function (req, res) {
  res.render('auth/register');
});

router.post('/register', function (req, res) {
  User.register(new User({username: req.body.username, name: req.body.name}), req.body.password, function(err, user) {
    if (err) return res.render('auth/register', {user: user});
    passport.authenticate('local')(req, res, function () {
      req.session.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
});

router.get('/login', function (req, res) {
  res.render('auth/login', {user : req.user});
});

router.post('/login', passport.authenticate(
  'local',
  {
    failureRedirect: '/login'
  }),
  function (req, res, next) {
    req.session.save(function (err) {
      if (err) return next(err);
      res.redirect('/');
    });
  }
);

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/secret', isLoggedIn, function (req, res) {
  res.render('secret', {user: req.user});
});

// middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the login page
  res.redirect('/login');
}

module.exports = router;
