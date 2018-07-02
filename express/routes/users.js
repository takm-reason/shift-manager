const express = require('express');
const router = new express.Router();
const hash = require('./../passport').hash;

const getModel = () => {
  return require(`./model-mysql`);
};

router.use((req, res, next) => {
  if (!req.user.root) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
  next();
});

/* GET users listing. */
router.get('/', (req, res, next) => {
  getModel().list('users', (err, entities) => {
    if (err) {
      next(err);
      return;
    }
    if (entities.length == 0) {
      res.ridirect('login');
    }
    res.render('layout/userlist.pug', {
      title: 'Bookshelf',
      nav: true,
      side: [
        {
          text: 'users.get',
          href: './shift',
        },
      ],
      main: {
        users: entities,
      },
    });
  });
});

router.post('/', (req, res, next) => {
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
