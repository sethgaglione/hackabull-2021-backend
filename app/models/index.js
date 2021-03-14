const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.DATABASE_URL;
db.users = require('./user.model.js')(mongoose);
db.tutorials = require("./tutorial.model.js")(mongoose);

module.exports = db;