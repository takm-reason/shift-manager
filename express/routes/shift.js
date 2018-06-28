const express = require('express');
const router = new express.Router();
const async = require('async');

const getModel = () => {
  return require(`./model-mysql`);
};

const isMobile = (userAgent) => {
  return (
      userAgent.indexOf('Windows') != -1 &&
      userAgent.indexOf('Phone') != -1
    ) ||
    userAgent.indexOf('iPhone') != -1 ||
    userAgent.indexOf('iPod') != -1
    || (
      userAgent.indexOf('Android') != -1 &&
      userAgent.indexOf('Mobile') != -1
    ) ||
    (
      userAgent.indexOf('Firefox') != -1 &&
      userAgent.indexOf('Mobile') != -1
    ) ||
    (
      userAgent.indexOf('BB10') != -1 &&
      userAgent.indexOf('Mobile') != -1
    );
};

(callback) => {
  getModel().list(`users`, (err, results) => {
    if (err) {
      next(err);
      return;
    }
    callback(err, results);
  });
};

/* GET home page. */
router.get('/', (req, res, next) => {
  async.parallel({
    users: (callback) => {
      getModel().list(`users`, (err, results) => {
        if (err) {
          next(err);
          return;
        }
        callback(err, results);
      });
    },
    sleep: (callback) => {
      getModel().list(`sleep`, (err, results) => {
        if (err) {
          next(err);
          return;
        }
        callback(err, results);
      });
    },
    shift: (callback) => {
      getModel().list(`shift`,
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
    res.render('shift', {
      title: 'Express',
      users: results.users,
      sleep: results.sleep,
      shift: results.shift,
    });
  });
});

// const insert = (req, next) => {
//   if (req.body.insertlength >= 1) {
//     req.body.insertlength = req.body.insertlength - 1;
//     const insertdate = {};
//     insertdate.date = req.body.insert[req.body.insertlength];
//     insertdate.in = req.body.insert[req.body.insertlength];
//     insertdate.out = req.body.insert[req.body.insertlength];
//     insertdate.note = '';
//     insertdate.userid = req.user.id;
//     getModel().create('sleep', insertdate, (err) => {
//       if (err) {
//         next(err);
//         return;
//       }
//     });
//     insert(req, next);
//   }
//   return;
// };

// const _delete = (req, next) => {
//   if (req.body.deletelength >= 1) {
//     req.body.deletelength = req.body.deletelength - 1;
//     getModel().delete(
//       'sleep', 'id', req.body.delete[req.body.deletelength], (err) => {
//       if (err) {
//         next(err);
//         return;
//       }
//     });
//     _delete(req, next);
//   }
//   return;
// };

router.post('/', (req, res, next) => {
  console.log(req.body);
  res.send(req.body);
});

// router.post('/', (req, res, next) => {
//   console.log(req.body);
//   if (req.body.insertlength == 1) {
//     req.body.insert = [req.body.insert];
//   }
//   if (req.body.deletelength == 1) {
//     req.body.delete = [req.body.delete];
//   }
//   if (req.body.insert) {
//     insert(req, next);
//   }
//   if (req.body.delete) {
//     _delete(req, next);
//   }
//   res.redirect('/');
//   // res.send(req.body);
// });

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
