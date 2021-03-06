const express = require('express');
const router = new express.Router();
const async = require('async');

const getModel = () => {
  return require(`./model-mysql`);
};

// 昨日を求める
const getYesterday = (date) => {
  const yesterday = new Date(date);
  return yesterday.setDate(yesterday.getDate() - 1);
};

// 前回の月曜日を求める
const getPrevMonday = (date) => {
  const prevMonday = new Date(date);
  if (prevMonday.getDay() == 1) {
    return prevMonday;
  }
  return getPrevMonday(getYesterday(prevMonday));
};

// 一週間後を求める
const getNextDay = (date) => {
  const nextDay = new Date(date);
  return nextDay.setDate(nextDay.getDate() + 7);
};

// 配列の最後の要素の一週間後を配列の最後に追加する
const addNextDay = (date) => {
  return date.concat(new Date(getNextDay(date[date.length - 1])));
};

// 1日後を求める
const getNextDate = (date) => {
  const nextDate = new Date(date);
  return nextDate.setDate(nextDate.getDate() + 1);
};

// 配列の最後の要素の1日後を配列の最後に追加する
const addNextDate = (date) => {
  return date.concat(new Date(getNextDate(date[date.length - 1])));
};

// 配列が7日間になるまで追加
const week = (date) => {
  if (date.length == 7) {
    return date;
  }
  return week(addNextDate(date));
};

/* GET home page. */
router.get('/', (req, res, next) => {
  getModel().readbetween(
    'plans', 'userid', req.user.userid, 'date',
    new Date(getPrevMonday(new Date())).toLocaleDateString(),
    new Date(
      getNextDay(getNextDay(getPrevMonday(new Date())))
    ).toLocaleDateString(),
    (err, results) => {
      if (err) {
        next(err);
        return;
      }
      res.render('layout/index.pug', {
        req: req,
        weeks: addNextDay([getPrevMonday(new Date())]).map((date) => {
          return week([date]);
        }),
        results: results,
      });
    }
  );
});

/* GET home page. */
router.get('/section', (req, res, next) => {
  getModel().readbetween(
    'plans', 'userid', req.user.userid, 'date', '2018/01/01', '2018/12/31',
    (err, results) => {
      if (err) {
        next(err);
        return;
      }
      res.render('layout/section.pug', {
        req: req,
        section: results,
      });
    }
  );
});

module.exports = router;
