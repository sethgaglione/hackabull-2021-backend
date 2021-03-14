const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Require routes
require('./app/routes/users.routes')(app);
require('./app/routes/logs.routes')(app);
require('./app/routes/twilio.routes')(app);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});