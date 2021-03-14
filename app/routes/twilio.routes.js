module.exports = app => {
  const twilio = require('../controllers/twilio.controller');

  var router = require('express').Router();
  router.post('/messages', twilio.messages);

  app.use('', router);
}