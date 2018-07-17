const express = require('express');
const router = new express.Router();
const async = require('async');
const view = require('./view.json');

const getModel = () => {
  return require(`./model-mysql`);
};

const fun = (table) => {
  return (callback) => {
    getModel().table(table, (err, results) => {
      if (err) {
        return;
      }
      callback(err, results);
    });
  };
};

/* GET home page. */
router.get('/', (req, res, next) => {
  getModel().showtable((err, results) => {
    if (err) {
      next(err);
      return;
    }

    const obj = {};
    results.map((date) => {
      obj[date.Tables_in_bookshelf] = fun(date.Tables_in_bookshelf);
    });

    async.parallel(obj, (err, results) => {
      if (err) {
        throw err;
      }
      res.render('layout/section.pug', {
        req: req,
        title: view.title,
        nav: view.nav,
        main: view.main,
        section: results,
      });
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

router.get(
  '/join/:lefttable/:righttable/:leftcolumn/:rightcolumn/:column/:value',
  (req, res, next) => {
  getModel().join(
    req.params.lefttable, req.params.righttable,
    req.params.leftcolumn, req.params.rightcolumn,
    req.params.column, req.params.value,
    (err, results) => {
      if (err) {
        next(err);
        return;
      }
      res.send(results);
    }
  );
});

module.exports = router;
