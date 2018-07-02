const express = require('express');
const router = new express.Router();
const async = require('async');

const getModel = () => {
  return require(`./model-mysql`);
};

const getSidebar = (results, table = false) => {
  results = results.map((result) => {
    return {
      text: result.Tables_in_bookshelf,
      href: `./${result.Tables_in_bookshelf}`,
      active: result.Tables_in_bookshelf == table ? 'active' : '',
    };
  });
  console.log(results);
  return results;
};

/* GET home page. */
router.get('/', (req, res, next) => {
  getModel().showtable((err, results) => {
    if (err) {
      next(err);
      return;
    }
    res.render('layout/database.pug', {
      title: 'Express',
      nav: true,
      side: getSidebar(results),
      main: {
        results: results,
      },
    });
  });
});

/* GET home page. */
router.get('/:table', (req, res, next) => {
  async.parallel({
    table: (callback) => {
      getModel().table(req.params.table, (err, results) => {
        if (err) {
          next(err);
          return;
        }
        callback(err, results);
      });
    },
    tablelist: (callback) => {
      getModel().showtable((err, results) => {
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
    res.render('layout/database.pug', {
      title: 'Express',
      nav: true,
      side: getSidebar(results.tablelist, req.params.table),
      main: {
        type: 'table',
        title: req.params.table,
        results: results.table,
      },
    });
  });
});

module.exports = router;
