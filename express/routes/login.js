const express = require('express');
const router = new express.Router();
const passport = require('./../passport');
const view = require('./view.json');

// Initialize Passport and restore authentication state, if any, from the
// session.
router.use(passport.initialize());
router.use(passport.session());

router.get('/login',
  (req, res) => {
    res.render('layout/login.pug', {
      req: req,
      title: view.title,
      nav: view.nav,
      side: null,
      main: view.main,
    });
  }
);

router.post('/login',
  passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
  })
);

router.get('/logout',
  (req, res) => {
    req.logout();
    res.redirect('/');
  }
);

module.exports = router;
