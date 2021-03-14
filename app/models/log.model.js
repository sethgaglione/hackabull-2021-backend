const { Schema } = require("mongoose");

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      timestamp: Date,
      location: String,
      user: [{type: Schema.Types.ObjectId, ref: 'user'}]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Log = mongoose.model('log', schema);
  
  return Log;
}