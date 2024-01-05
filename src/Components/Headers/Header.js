import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("role") == "Admin" ? true : false
  );
  const handleLogoutClick = () => {
    localStorage.removeItem("access-Token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flex: "1" }}>Test project</Typography>
        {isAdmin && (
          <>
            <Box sx={{ marginLeft: "10px" }}>
              <Link
                to="/admin"
                style={{ cursor: "pointer", textDecoration: "none" }}
              >
                <Typography color="white">Admin</Typography>
              </Link>
            </Box>
            <Box sx={{ marginLeft: "10px" }}>
              <Link
                to="/admin/register"
                style={{ cursor: "pointer", textDecoration: "none" }}
              >
                <Typography color="white">Add a User/Admin</Typography>
              </Link>
            </Box>
          </>
        )}
        <Button onClick={handleLogoutClick}>
          <Typography color="white">Logout</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
