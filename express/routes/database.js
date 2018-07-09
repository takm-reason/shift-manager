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
      req: req,
      title: view.title,
      nav: view.nav,
      side: results.tablelist.map((result) => {
        return {
          text: result.Tables_in_bookshelf,
          href: `./database/${result.Tables_in_bookshelf}`,
        };
      }),
      main: view.main,
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
    column: (callback) => {
      getModel().showcolumn(req.params.table, (err, results) => {
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
      req: req,
      title: view.title,
      nav: view.nav,
      side: results.tablelist.map((result) => {
        return {
          text: result.Tables_in_bookshelf,
          href: `./${result.Tables_in_bookshelf}`,
          active: result.Tables_in_bookshelf == req.params.table
            ? 'active' : '',
        };
      }),
      main: {
        type: 'table',
        title: req.params.table,
        table: results.table,
        column: results.column,
      },
    });
  });
});

router.post('/:table', (req, res, next) => {
  getModel().create(req.params.table, req.body, (err) => {
      if (err) {
        next(err);
        return;
      } else {
        res.redirect(`/database/${req.params.table}`);
      }
    },
  );
});

router.post('/:table/delete', (req, res, next) => {
  getModel().delete(req.params.table, 'id', req.body.id, (err) => {
      if (err) {
        next(err);
        return;
      } else {
        res.redirect(`/database/${req.params.table}`);
      }
    },
  );
});

module.exports = router;
