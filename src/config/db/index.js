const mongoose = require("mongoose");
const { DB_NAME } = require("../");

mongoose.connect(
  `mongodb://localhost:27017/${DB_NAME}`
);

module.exports = mongoose;
