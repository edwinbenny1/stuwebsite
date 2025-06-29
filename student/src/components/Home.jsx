import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)', // Full height minus navbar
        width: '100vw',               // Full screen width
        background: 'linear-gradient(to right, #1976d2, #42a5f5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        overflowX: 'hidden',         // Prevent side scroll
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: 4,
          backgroundColor: '#ffffffee',
          borderRadius: '16px',
          maxWidth: 700,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Button
  variant="outlined"
  color="secondary"
  sx={{ mt: 2, ml: 2 }}
  component={Link}
  to="/login"
>
  🔐 Admin Login
</Button>

        <Typography variant="h3" color="primary" gutterBottom>
          Welcome!
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ color: '#333' }}>
          to the Student Management System
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          📚 Use the navbar to view student records, add new students, and manage their data including attendance, marks, and more.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 4 }}
          component={Link}
          to="/student-list"
        >
          View Student List
        </Button>

        <Typography variant="body2" sx={{ mt: 3, fontStyle: 'italic', color: 'gray' }}>
          Developed with 💙 using React & MUI
        </Typography>
      </Paper>
    </Box>
  );
};

export default Home;
