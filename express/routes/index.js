const express = require('express');
const router = new express.Router();
const async = require('async');
const view = require('./view.json');

const getModel = () => {
  return require(`./model-mysql`);
};

const yesterday = (date) => {
  return new Date(date.setDate(date.getDate() - 1));
};

const prevMonday = (date) => {
  if (date.getDay() == 1) {
    return date;
  }
  return prevMonday(yesterday(date));
};

const nextDate = (date, nextdate = 1) => {
  return new Date(date.setDate(date.getDate() + nextdate));
};

const addNextDate = (date, lastDay) => {
  if (date.length >= 7) {
    return date;
  }
  return addNextDate(
    date.concat(nextDate(new Date(date[date.length - 1]))),
    lastDay
  );
};

const week = (date) => {
  return addNextDate([date], nextDate(new Date(date)), 7);
};

const monday3 = (date) => {
  const date1 = new Date(date);
  const date2 = new Date(date);
  date2.setDate(date2.getDate() + 7);
  const date3 = new Date(date);
  date3.setDate(date3.getDate() + 14);
  return [date1, date2, date3];
};

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(week(prevMonday(new Date())).map((date) => {
    return date.getDate();
  }));
  async.parallel({
    user: (callback) => {
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
      side: [],
      main: {
        type: 'table',
        title: '休み希望を入力するカレンダー',
        id: 'calendarform',
        results: results.plans,
        weeks: monday3(prevMonday(new Date())).map(week),
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
