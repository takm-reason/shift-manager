const express = require('express');
const router = new express.Router();
const async = require('async');
const view = require('./view.json');

const getModel = () => {
  return require(`./model-mysql`);
};

/* GET home page. */
router.get('/', (req, res, next) => {
  async.parallel({
    users: (callback) => {
      getModel().table(`users`, (err, results) => {
        if (err) {
          next(err);
          return;
        }
        callback(err, results);
      });
    },
    plans: (callback) => {
      getModel().table(`plans`, (err, results) => {
        if (err) {
          next(err);
          return;
        }
        callback(err, results);
      });
    },
  }, (err, results) => {
    if (err) {
      throw err;
    }
    res.render('layout/shift.pug', {
      req: req,
      title: view.title,
      nav: view.nav,
      main: {
        results: results,
      },
    });
  });
});

router.post('/', (req, res, next) => {
  console.log(req.body);
  res.send(req.body);
});

router.get('/month/:year/:month', (req, res, next) => {
  res.send(`${req.params.year} ${req.params.month}`);
});

router.get('/date/:year/:month/:date', (req, res, next) => {
  res.send(`${req.params.year} ${req.params.month} ${req.params.date}`);
});

module.exports = router;
