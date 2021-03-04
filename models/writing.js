const mongoose = require("../db/connections");

const writingSchema = new mongoose.Schema({
  username: { type: String, required: true,},
  project: { type: String },
  title: { type: String },
  body: { type: String },
});


const writing = mongoose.model("Writing", writingSchema);

module.exports = writing;