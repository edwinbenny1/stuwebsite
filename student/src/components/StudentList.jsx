import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:7000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Failed to fetch students:", err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this student?")) return;

    try {
      const res = await fetch(`http://localhost:7000/students/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setStudents(students.filter((s) => s._id !== id));
      } else {
        alert("Failed to delete");
      }
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <Box sx={{ maxWidth: "900px", margin: "0 auto" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        📋 Student Details
      </Typography>

      {students.map((student) => (
        <Paper
          key={student._id}
          elevation={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 24px",
            marginBottom: 2,
            borderRadius: "12px",
          }}
        >
          <Typography sx={{ flex: 1, fontSize: "18px", fontWeight: 500 }}>
            {student.name}
          </Typography>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(`/student/${student._id}`)}
            >
              View
            </Button>
          </Box>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <IconButton color="error" onClick={() => handleDelete(student._id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Paper>
      ))}

      {students.length === 0 && (
        <Typography align="center" color="textSecondary">
          No students available.
        </Typography>
      )}
    </Box>
  );
};

export default StudentList;
