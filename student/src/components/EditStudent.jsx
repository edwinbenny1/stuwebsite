import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Grid,
  Box,
  Button,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    fetch(`http://localhost:7000/students/${id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch((err) => console.error("Error fetching student:", err));
  }, [id]);

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
      const res = await fetch(`http://localhost:7000/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      if (res.ok) {
        alert("✅ Student updated!");
        navigate("/student-list");
      } else {
        alert("❌ Update failed");
      }
    } catch (err) {
      console.error("Error updating student:", err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          ✏ Edit Student
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
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  fullWidth
                  label={`Subject ${index + 1}`}
                  name={subject}
                  type="number"
                  value={student.marks[subject]}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
            ))}
          </Grid>

          <Box mt={3}>
            <Button variant="contained" color="primary" type="submit">
              💾 Save Changes
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default EditStudent;
