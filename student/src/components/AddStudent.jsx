import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
} from "@mui/material";

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    contact: "",
    address: "",
    course: "",
    attendance: "",
    marks: {
      subject1: "",
      subject2: "",
      subject3: "",
      subject4: "",
      subject5: "",
      subject6: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("subject")) {
      setStudent((prev) => ({
        ...prev,
        marks: {
          ...prev.marks,
          [name]: value,
        },
      }));
    } else {
      setStudent((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:7000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error("Server error:", data.error);
        return alert("❌ Failed to add student");
      }

      alert("✅ Student added successfully!");
      setStudent({
        name: "",
        age: "",
        contact: "",
        address: "",
        course: "",
        attendance: "",
        marks: {
          subject1: "",
          subject2: "",
          subject3: "",
          subject4: "",
          subject5: "",
          subject6: "",
        },
      });
    } catch (error) {
      console.error("Fetch error:", error);
      alert("⚠️ Network error. Try again.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          ➕ Add Student
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={student.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={student.age}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Contact"
            name="contact"
            value={student.contact}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={student.address}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Course"
            name="course"
            value={student.course}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Attendance (%)"
            name="attendance"
            type="number"
            value={student.attendance}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Typography variant="h6" sx={{ mt: 3 }}>
            🧠 Subject Marks
          </Typography>
          <Grid container spacing={2}>
            {Object.keys(student.marks).map((subject, index) => (
              <Grid item xs={12} sm={6} key={subject}>
                <TextField
                  fullWidth
                  label={`Subject ${index + 1}`}
                  name={subject}
                  type="number"
                  value={student.marks[subject]}
                  onChange={handleChange}
                  required
                />
              </Grid>
            ))}
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddStudent;
