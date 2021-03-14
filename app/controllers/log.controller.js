const { logs } = require('../models');
const db = require('../models');
const Log = db.logs;
const User = db.users;
const userutils = require('../utils/userutils');

// Log in
exports.createLog = (req, res) => {
  const location = req.body.location;
  const token = req.body.token;
  const date = req.body.date;

  if (!location) {
    res.status(400).send({ message: "Location must be provided." });
    return;
  } else if (!token) {
    res.status(400).send({ message: "Token must be provided." });
    return;
  } else if (!date) {
    res.status(400).send({ message: "Date must be provided." });
    return;
  }

  User.findOne({token: token})
    .then(user => {
      if(!user) {
        return res.status(500).send({ message: "User Not Found" })
      }
      
      const log = new Log({
        date: date,
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