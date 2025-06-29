// === server.js ===
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/students", studentRoutes);
app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 7000, () =>
      console.log("Server running on port", process.env.PORT || 7000)
    );
  })
  .catch((err) => console.error("DB connection error:", err));


// === models/Student.js ===
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
  teacherId: String,
});

module.exports = mongoose.model("Student", studentSchema);


// === routes/studentRoutes.js ===
const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// POST: Add student
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: All students or filtered by teacherId
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.teacherId) {
      filter.teacherId = req.query.teacherId;
    }
    const students = await Student.find(filter);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Single student
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Update student
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Remove student
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


// === .env ===
PORT=7000
MONGO_URI=your_mongodb_atlas_uri_here
JWT_SECRET=supersecretkey
