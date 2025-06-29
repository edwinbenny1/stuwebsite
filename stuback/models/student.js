const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  contact: String,
  address: String,
  course: String,
  attendance: Number,
  marks: {
    subject1: Number,
    subject2: Number,
    subject3: Number,
    subject4: Number,
    subject5: Number,
    subject6: Number,
  },
  teacherId: String
});

module.exports = mongoose.model("Student", studentSchema);
