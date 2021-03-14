const db = require('../models');
const User = db.users;
const userutils = require('../utils/userutils');

// Log in
exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username) {
    res.status(400).send({ message: "Username not specified" });
    return;
  } else if (!password) {
    res.status(400).send({ message: "Password not specified" });
    return;
  }

  User.findOne({username: username})
    .then(user => {
      if(!user) {
        return res.status(404).json({
          errors: [{ user: "Account not found" }, username],
        });
      } else {
        if(user.password !== userutils.hash(password, user.salt)) {
          return res.status(404).json({
            errors: [{ password: "Password is incorrect."}],
          });
        }

        var token = user.token;

        if (!token) {
          token = userutils.createToken();
          var date = new Date();
          date.setDate(date.getDate() + 1);
          
          user.token = token;
          user.tokenExpires = date;
          user.save();
        }

        return res.send({
          username: username, 
          token: token,
          tokenExpires: user.tokenExpires 
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: [err.message]
      });
    })
}

// Sign Up
exports.signup = (req, res) => {
  // Check to see if required fields are present
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const username = req.body.username;
  const phoneNumber = req.body.phoneNumber;
  const birthday = req.body.birthday;
  const password = req.body.password;

  if (!firstName) {
    res.status(400).send({ message: "First Name must be provided." });
    return;
  } else if (!lastName) {
    res.status(400).send({ message: "Last Name must be provided." });
    return;
  }
  else if (!email) {
    res.status(400).send({ message: "Email must be provided." });
    return;
  }
  else if (!username) {
    res.status(400).send({ message: "Username must be provided." });
    return;
  }
  else if (!phoneNumber) {
    res.status(400).send({ message: "Phone Number must be provided." });
    return;
  }
  else if (!birthday) {
    res.status(400).send({ message: "Birthday must be provided." });
    return;
  }
  else if (!password) {
    res.status(400).send({ message: "Password must be provided." });
    return;
  }

  User.findOne({username: username})
    .then(user => {
      if(user) {
        return res.status(500).send({ message: "Duplicate username" })
      }
    })

  const salt = userutils.createSalt();
  const token = userutils.createToken();

  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    phoneNumber: phoneNumber,
    birthday: birthday,
    password: userutils.hash(password, salt),
    salt: salt,
    userType: 1,
    photoFileName: null,
    token: token
  });

  // Save the user
  user
    .save(user)
    .then(data => {
      res.send({ Success: true });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message
      })
    })
};

// Logout
exports.logout = (req, res) => {
  const username = req.query.username;

  if (!username) {
    res.status(400).send({ message: "Username must be provided." });
    return;
  }

  User.findOne({username: username})
    .then(user => {
      if(!user) {
        return res.status(500).send({ message: "User Not Found?" })
      }

      user.token = null;
      user.tokenExpires = null;
      user.save();
      return res.status(200).send({ message: "Success UwU"});
    }).catch( err => {
      res.status(500).send({
        message:
          err.message
      })
    });
};

// Remember
exports.rememberme = (req, res) => {
  const username = req.query.username;
  const token = req.query.token;

  if (!username) {
    res.status(400).send({ message: "Username must be provided." });
    return;
  } else if (!token) {
    res.status(400).send({ message: "Token must be provided." });
    return;
  }

  User.findOne({username: username})
  .then(user => {
    if(!user) {
      return res.status(500).send({ message: "User Not Found?" })
    }

    if (user.token === token) {
      return res.status(200).send({ relog: true });
    } else {
      return res.status(200).send({ relog: true });
    }
  }).catch(err => {
    res.status(500).send({
      message:
        err.message
    })
  });

};
