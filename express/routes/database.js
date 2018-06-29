const express = require('express');
const router = new express.Router();

const getModel = () => {
  return require(`./model-mysql`);
};

/* GET home page. */
router.get('/', (req, res, next) => {
  getModel().showtable(((err, results) => {
    if (err) {
      next(err);
      return;
    }
    res.render('database', {
      title: 'Express',
    });
  }));
});

/* GET home page. */
router.get('/:table', (req, res, next) => {
  getModel().table(req.params.table, (err, results) => {
    if (err) {
      next(err);
      return;
    }
    res.render('database', {
      title: 'Express',
      tablename: req.params.table,
      tabledate: results,
    });
  });
});

module.exports = router;
