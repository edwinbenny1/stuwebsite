// src/components/TeacherDashboard.jsx

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Failed to fetch students:", err));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        📊 Student Performance (All Students)
      </Typography>

      {students.map((student) => {
        const marks = student.marks || {};
        const chartData = Object.entries(marks).map(([subject, score]) => ({
          subject,
          score: Number(score),
        }));

        return (
          <Paper key={student._id} elevation={4} sx={{ mb: 4, p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              👤 {student.name} | 📚 {student.course}
            </Typography>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#1976d2" name="Marks" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        );
      })}
    </Container>
  );
};

export default TeacherDashboard;
