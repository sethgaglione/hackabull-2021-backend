module.exports = app => {
  const users = require('../controllers/user.controller');

  var router = require('express').Router();
  router.post('/login', users.login);
  router.post('/signup', users.signup);
  router.post('/logout', users.logout);
  router.post('/rememberme', users.rememberme);
  router.delete('/deleteuser', users.deleteuser);

  app.use('', router);
}