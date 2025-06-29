import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

function StudentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:7000/students/${id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch((err) => console.error("Error fetching student:", err));
  }, [id]);

  if (!student) return <Typography sx={{ mt: 4 }}>Loading...</Typography>;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        📘 Student Details
      </Typography>
      <Box component={Paper} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">Name: {student.name}</Typography>
        <Typography variant="h6">Course: {student.course}</Typography>
        <Typography variant="h6">Attendance: {student.attendance}%</Typography>
      </Box>

      <Typography variant="h5" gutterBottom>
        📝 Subject Marks
      </Typography>

      <Table>
        <TableBody>
          {Object.entries(student.marks || {}).map(([subject, score]) => (
            <TableRow key={subject}>
              <TableCell>{subject}</TableCell>
              <TableCell>{score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box mt={3}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(`/edit-student/${student._id}`)}
        >
          ✏ Edit Student
        </Button>
      </Box>
    </Container>
  );
}

export default StudentDetails;
