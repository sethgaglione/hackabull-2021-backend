const { logs } = require('../models');
const db = require('../models');
const Log = db.logs;
const User = db.users;
const userutils = require('../utils/userutils');

// Log in
exports.createLog = (req, res) => {
  const location = req.body.location;
  const token = req.body.token;

  if (!location) {
    res.status(400).send({ message: "Username must be provided." });
    return;
  }
  if (!token) {
    res.status(400).send({ message: "Username must be provided." });
    return;
  }

  User.findOne({token: token})
    .then(user => {
      if(!user) {
        return res.status(500).send({ message: "User Not Found" })
      }
      
      const log = new Log({
        timestamp: new Date(),
        location: location,
        user: user
      });

      // Save the user
      log
        .save(log)
        .then(data => {
          res.send({ Success: true });
        }).catch(err => {
          res.status(500).send({
            message:
              err.message
          })})
    })
    .catch( err => {
      res.status(500).send({
        message:
          err.message
      })
  });
}

// Log in
exports.getLogs = (req, res) => {
  const token = req.body.token;

  if (!token) {
    res.status(400).send({ message: "Token must be provided." });
    return;
  }

  User.findOne({token: token})
    .then(user => {
      if(!user) {
        return res.status(500).send({ message: "User Not Found" })
      }
  
      Log.find({user: user}, (err, logs) => {
        if (err){
          return 
            res.status(500).send({
              message:
                err.message
            });
        }
        return res.status(200).send({
          logs: [logs]
        });
      })
      
    })
    .catch( err => {
      res.status(500).send({
        message:
          err.message
      });
    });
}