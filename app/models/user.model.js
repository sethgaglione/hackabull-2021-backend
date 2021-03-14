module.exports = mongoose => {
  var schema = mongoose.Schema(
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

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model('user', schema);
  
  return User;
}