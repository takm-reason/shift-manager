const express = require('express');
const router = new express.Router();

const getModel = () => {
  return require(`./model-mysql`);
};

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('database', {
    title: 'Express',
  });
});

module.exports = router;
