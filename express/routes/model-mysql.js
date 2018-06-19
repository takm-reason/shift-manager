'use strict';

const extend = require('lodash').assign;
const mysql = require('mysql');
const config = require('./../config.json');

const options = {
  user: config.user,
  password: config.password,
  database: config.database,
  host: config.host,
};

const connection = mysql.createConnection(options);

const list = (table, cb) => {
  connection.query('SELECT * FROM ??', table, (err, results) => {
    if (err) {
      cd(err);
      return;
    }
    cb(null, results);
  });
};

const create = (table, data, cb) => {
  connection.query('INSERT INTO ?? SET ?', [table, data], (err, res) => {
    if (err) {
      cb(err);
      return;
    }
    read(table, 'id', res.insertId, cb);
  });
};

const read = (table, column, value, cb) => {
  connection.query(
    'SELECT * FROM ?? WHERE ?? = ?', [table, column, value], (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
    });
};

const update = (table, column, value, data, cb) => {
  connection.query(
    'UPDATE ?? SET ? WHERE ?? = ?', [table, date, column, value], (err) => {
      if (err) {
        cb(err);
        return;
      }
      read(id, cb);
    });
};

const _delete = (table, column, value, cb) => {
  connection.query('DELETE FROM ?? WHERE ?? = ?', [table, column, value], cb);
};

module.exports = {
  list: list,
  create: create,
  read: read,
  update: update,
  delete: _delete,
};