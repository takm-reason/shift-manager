const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const crypto = require('crypto');

const getModel = () => {
  return require('./routes/model-mysql.js');
};

passport.serializeUser((user, cb) => {
  cb(null, user.username);
});

passport.deserializeUser((username, cb) => {
  getModel().read('users', 'username', username, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user[0]);
  });
});

passport.hash = (user, pass) =>{
  const sha512 = crypto.createHash('sha512');
  sha512.update(`user${user}pass${pass}`);
  return sha512.digest('hex');
};

passport.use(new Strategy(function(username, password, cb) {
  password = passport.hash(username, password);
  getModel().read('users', 'username', username, (err, user) => {
    if (err) {
      return cb(err);
    }
    if (!user[0]) {
      return cb(null, false);
    }
    if (user[0].password != password) {
      return cb(null, false);
    }
    return cb(null, user[0]);
  });
}));

module.exports = passport;
