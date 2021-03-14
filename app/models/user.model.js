const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
      firstName: String,
      lastName: String,
      email: String,
      userName: String,
      phoneNumber : String,
      birthday: Date,
      password: String,
      salt: String,
      userType: Number,
      photoFileName: String,
      token: String,
      tokenExpires: Date
    },
    { timestamps: true }
  );
module.exports = mongoose.model('user', userSchema);