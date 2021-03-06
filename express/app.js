const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const passport = require('./passport');
const authorize = require('connect-ensure-login').ensureLoggedIn('/login');

const login = require('./routes/login');
const index = require('./routes/index');
const users = require('./routes/users');
const sleep = require('./routes/sleep');
const shift = require('./routes/shift');
const database = require('./routes/database');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({
  secret: 'keyboard cat', resave: false, saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', login, authorize, index);
app.use(authorize);
// app.use('/', login, index);

app.use('/users', users);
app.use('/sleep', sleep);
app.use('/shift', shift);
app.use('/database', database);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
