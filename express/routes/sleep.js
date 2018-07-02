const express = require('express');
const router = new express.Router();

const getModel = () => {
  return require(`./model-mysql`);
};

/* GET home page. */
router.get('/', (req, res, next) => {
  getModel().read(`sleep`, `userid`, req.user.id,
  (err, results) => {
    if (err) {
      next(err);
      return;
    }
    res.render('layout/sleep.pug', {
      title: 'Express',
      nav: true,
      side: [],
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
    insertdate.out = req.body.insert[req.body.insertlength];
    insertdate.note = '';
    insertdate.userid = req.user.id;
    getModel().create('sleep', insertdate, (err) => {
      if (err) {
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
      'sleep', 'id', req.body.delete[req.body.deletelength], (err) => {
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

module.exports = router;

/* GET home page. */
// router.get('/', (req, res, next) => {
//   getModel().read('1', (err, entity) => {
//     if (err) {
//       next(err);
//       return;
//     }
//     res.render('index', {title: entity.username});
//   });
// });
