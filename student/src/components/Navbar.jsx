import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Student List", path: "/student-list" },
    { name: "Add Student", path: "/add-student" },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2", width: "100%" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          🎓 Student Management
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleMenu}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              {navLinks.map((link) => (
                <MenuItem
                  key={link.name}
                  component={Link}
                  to={link.path}
                  onClick={handleClose}
                >
                  {link.name}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box>
            {navLinks.map((link) => (
              <Button
                key={link.name}
                component={Link}
                to={link.path}
                sx={{ color: "white" }}
              >
                {link.name}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
