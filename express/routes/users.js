const express = require('express');
const router = new express.Router();
const async = require('async');
const hash = require('./../passport').hash;

const getModel = () => {
  return require(`./model-mysql`);
};

/* GET users listing. */
router.get('/', (req, res, next) => {
  getModel().table('users', (err, entities) => {
    if (err) {
      next(err);
      return;
    }
    if (entities.length == 0) {
      res.ridirect('login');
    }
    res.render('layout/users.pug', {
      req: req,
      main: {
        users: entities,
      },
    });
  });
});

router.post('/', (req, res, next) => {
  if (!req.user.root) {
    res.redirect('/users');
  }
  if (!req.body.username) {
    res.redirect('/users');
  }
  if (!req.body.password) {
    res.redirect('/users');
  }
  req.body.password = hash(req.body.username, req.body.password);
  req.body.root ? req.body.root = true : req.body.root = false;
  getModel().create('users', req.body, (err) => {
      if (err) {
        next(err);
        return;
      }
    },
    res.redirect('/users')
  );
});

module.exports = router;
