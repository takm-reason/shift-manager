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
    plans: (callback) => {
      getModel().read(`plans`, `userid`, req.user.id,
      (err, results) => {
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
    res.render('layout/index.pug', {
      req: req,
      title: view.title,
      nav: view.nav,
      side: [
        {
          text: 'index.get',
          href: './shift',
        },
      ],
      main: {
        type: 'table',
        title: '休み希望を入力するカレンダー',
        id: 'calendarform',
        results: results.plans,
      },
    });
  });
});


router.post('/', (req, res, next) => {
  console.log(req.body);
  if (req.body.insertlength == 1) {
    req.body.insert = [req.body.insert];
  }
  if (req.body.deletelength == 1) {
    req.body.delete = [req.body.delete];
  }
  if (req.body.insert) {
    insert(req, next);
  }
  if (req.body.delete) {
    _delete(req, next);
  }
  res.redirect('/');
  // res.send(req.body);
});

module.exports = router;
