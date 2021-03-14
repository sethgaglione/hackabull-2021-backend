const e = require('express');
const db = require('../models');
const user = require('../models/user.model');
const User = db.User;
const userutils = require('../utils/userutils');

// Log in
exports.login = (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  if (!username) {
    res.status(400).send({ message: "Username not specified" });
    return;
  } else if (!password) {
    res.status(400).send({ message: "Password not specified" });
    return;
  }

  User.find({username: username}, (err, data) => {
    if(data.password === userutils.hash(password, data.salt)) {

      const token = userutils.createToken();
      const date = new Date(Date().setMonth(Date().getMonth + 1));

      data.token = token;
      data.tokenExpires = date;
      data.save((err) => {
        if (err)
          console.log('User Log in Failed')
        else
          console.log('User Log in Successful')
      });

      res.send({
        username: username, 
        token: token,
        tokenExpires: date
      })
    }
  })
    /*.then(data => {
      if(data.password == userutils.hash(password, data.salt)) {

        const token = userutils.createToken();

        res.send({
          username: username, 
          token: token,
          tokenExpires: new Date(Date().setMonth(Date().getMonth + 1))
        })
      }
    })*/
    .catch(err => {
      res.status(500).send({
        message:
          err.message
      })
    });
};

// Sign Up
exports.signup = (req, res) => {
  // Check to see if required fields are present
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const userName = req.body.userName;
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
  else if (!userName) {
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

  const salt = userutils.createSalt();
  const token = userutils.createToken();

  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    userName: userName,
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
      res.send(data);
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
  const userName = req.query.userName;

  if (!userName) {
    res.status(400).send({ message: "Username must be provided." });
    return;
  }

  User.find({username: username})
    .then(data => {
      if(data.password == userutils.hash(password, data.salt)) {

        const token = userutils.createToken();

        res.send({
          username: username, 
          token: token,
          tokenExpires: new Date(Date().setMonth(Date().getMonth + 1))
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message
      })
    });
};


// Remember
exports.rememberme = (req, res) => {

};

// delete user
exports.deleteuser = (req, res) => {

};