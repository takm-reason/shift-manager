const express = require('express');
const router = new express.Router();
const async = require('async');

const getModel = () => {
  return require(`./model-mysql`);
};

/* GET home page. */
router.get('/', (req, res, next) => {
  getModel().read(`plans`, `userid`, req.user.userid,
  (err, results) => {
    if (err) {
      next(err);
      return;
    }
    console.log(results);
    res.render('layout/sleep.pug', {
      req: req,
      main: {
        results: results,
    },
  });
  });
});

const insert = (req, next) => {
  if (req.body.insertlength >= 1) {
    req.body.insertlength = req.body.insertlength - 1;
    const insertdate = {};
    insertdate.date = req.body.insert[req.body.insertlength];
    insertdate.in = req.body.insert[req.body.insertlength];
    insertdate.length = req.body.insert[req.body.insertlength];
    insertdate.note = '';
    insertdate.shop = 0;
    insertdate.userid = req.user.userid;
    getModel().create('plans', insertdate, (err) => {
      if (err) {
        console.log(err);
        next(err);
        return;
      }
    });
    insert(req, next);
  }
  return;
};

const _delete = (req, next) => {
  if (req.body.deletelength >= 1) {
    req.body.deletelength = req.body.deletelength - 1;
    getModel().delete(
      'plans', 'planid', req.body.delete[req.body.deletelength], (err) => {
      if (err) {
        next(err);
        return;
      }
    });
    _delete(req, next);
  }
  return;
};

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
  res.redirect('/sleep');
  // res.send(req.body);
});

router.get('/month/:year/:month', (req, res, next) => {
  res.send(`${req.params.year} ${req.params.month}`);
});

router.get('/date/:year/:month/:date', (req, res, next) => {
  res.send(`${req.params.year} ${req.params.month} ${req.params.date}`);
});

module.exports = router;
