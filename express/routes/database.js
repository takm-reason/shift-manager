const express = require('express');
const router = new express.Router();

const getModel = () => {
  return require(`./model-mysql`);
};

const sidebar = () => [
  {
    text: 'users',
    active: true,
    link: 'database/users',
  },
  {
    text: 'sleep',
    active: true,
    link: 'database/sleep',
  },
  {
    text: 'shift',
    active: true,
    link: 'database/shift',
  },
];

/* GET home page. */
router.get('/', (req, res, next) => {
  getModel().showtable(((err, results) => {
    if (err) {
      next(err);
      return;
    }
    res.render('layout/index.pug', {
      title: 'Express',
      mains: [],
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
    res.render('layout/index.pug', {
      title: 'Express',
      mains: [
        {
          kind: 'table',
          title: req.params.table,
          results: results,
        },
      ],
    });
  });
});

module.exports = router;
