'use strict';

const extend = require('lodash').assign;
const mysql = require('mysql');
const config = require('./../config.json');

const options = {
  user: config.user,
  password: config.password,
  database: config.database,
  host: config.host,
  multipleStatements: true,
};

const connection = mysql.createConnection(options);

const showtable = (cb) => {
  connection.query('SHOW TABLES', (err, results) => {
    if (err) {
      cb(err);
      return;
    }
    return cb(null, results);
  });
};

const showcolumn = (table, cb) => {
  connection.query('SHOW COLUMNS FROM ??', table, (err, results) => {
    if (err) {
      cb(err);
      return;
    }
    return cb(null, results);
  });
};

const join = (
  lefttable, righttable,
  leftcolumn, rightcolumn,
  column, value, cb) => {
  connection.query(
    'SELECT * FROM ?? JOIN ?? ON ?? = ?? WHERE ?? = ?',
    [
      lefttable, righttable,
      leftcolumn, rightcolumn,
      column, value,
    ], (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
    }
  );
};

const create = (table, data, cb) => {
  connection.query('INSERT INTO ?? SET ?', [table, data], (err, res) => {
    if (err) {
      cb(err);
      return;
    }
  });
};

const table = (table, cb) => {
  connection.query('SELECT * FROM ??', table, (err, results) => {
    if (err) {
      cb(err);
      return;
    }
    return cb(null, results);
  });
};

const read = (table, column, value, cb) => {
  connection.query(
    'SELECT * FROM ?? WHERE ?? = ?',
    [table, column, value],
    (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
    }
  );
};

const between = (table, between, min, max, cb) => {
  connection.query(
    'SELECT * FROM ?? WHERE ?? BETWEEN ? AND ?',
    [table, between, min, max], (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
    }
  );
};

const readbetween = (table, column, value, between, min, max, cb) => {
  connection.query(
    'SELECT * FROM ?? WHERE ?? = ? AND ?? BETWEEN ? AND ?',
    [table, column, value, between, min, max], (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
    }
  );
};

const update = (table, column, value, data, cb) => {
  connection.query(
    'UPDATE ?? SET ? WHERE ?? = ?', [table, data, column, value], (err) => {
      if (err) {
        cb(err);
        return;
      }
      read(id, cb);
    }
  );
};

const _delete = (table, column, value, cb) => {
  connection.query('DELETE FROM ?? WHERE ?? = ?', [table, column, value], cb);
};

module.exports = {
  showtable: showtable,
  showcolumn: showcolumn,
  join: join,
  create: create,
  table: table,
  read: read,
  between: between,
  readbetween: readbetween,
  update: update,
  delete: _delete,
};
