const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String, // hashed
  role: String // "admin" or "teacher"
});

module.exports = mongoose.model("User", userSchema);
