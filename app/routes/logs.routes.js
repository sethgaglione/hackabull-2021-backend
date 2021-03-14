module.exports = app => {
  const users = require('../controllers/log.controller');

  var router = require('express').Router();
  router.post('/createLog', users.createLog);
  router.get('/getLogs', users.getLogs);

  app.use('', router);
}