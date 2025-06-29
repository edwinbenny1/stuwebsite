import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Box,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:7000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  const calculateTotal = (marks) =>
    Object.values(marks || {}).reduce((sum, val) => sum + Number(val || 0), 0);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this student?")) {
      await fetch(`http://localhost:7000/students/${id}`, { method: "DELETE" });
      setStudents((prev) => prev.filter((s) => s._id !== id));
    }
  };

  const topScorer = students.reduce((top, curr) => {
    return calculateTotal(curr.marks) > calculateTotal(top.marks) ? curr : top;
  }, students[0] || { marks: {} });

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        🧑‍💼 Admin Dashboard
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">👥 Total Students</Typography>
            <Typography>{students.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">🏆 Top Scorer</Typography>
            <Typography>{topScorer?.name || "N/A"}</Typography>
            <Typography>Total: {calculateTotal(topScorer?.marks)}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/add-student")}
        sx={{ mb: 3 }}
      >
        ➕ Add New Student
      </Button>

      {students.map((s) => (
        <Paper
          key={s._id}
          sx={{
            p: 2,
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography fontWeight={600}>{s.name}</Typography>
            <Typography variant="body2">
              Total Marks: {calculateTotal(s.marks)}
            </Typography>
          </Box>
          <Box>
            <Button
              variant="outlined"
              onClick={() => navigate(`/student/${s._id}`)}
              sx={{ mr: 1 }}
            >
              View
            </Button>
            <IconButton color="error" onClick={() => handleDelete(s._id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default AdminDashboard;
