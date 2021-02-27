const mongoose = require("../db/connections");

const writingSchema = new mongoose.Schema({
  username: { type: String, required: true,},
  title: { type: String },
  body: { type: String },
});


const writing = mongoose.model("Writing", writingSchema);

// export the newly created model
module.exports = writing;