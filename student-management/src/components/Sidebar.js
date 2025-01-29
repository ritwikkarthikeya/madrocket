import React, { useState } from "react";
import { Box, List, ListItem, ListItemText, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user"); // Clear user session
    navigate("/"); // Redirect to login page
    setIsOpen(false); // Close sidebar on logout
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close sidebar when navigating
  };

  return (
    <>
      <IconButton onClick={handleToggle} sx={{ position: "absolute", top: 10, left: 20 }}>
        <MenuIcon />
      </IconButton>
      {isOpen && (
        <Box width="200px" bgcolor="white" height="90vh" p={2} className="boxiw" position="fixed" left={10} top={25}>
          <List>
            <ListItem 
              button 
              onClick={() => handleNavigation("/students")}
              sx={{
                backgroundColor: "#9c27b0",
                color: "white",
                "&:hover": {
                  backgroundColor: "#9c27b0",
                },
              }}
            >
              <ListItemText primary="Students Page" />
            </ListItem>
          </List>
          <Button variant="contained" color="secondary" fullWidth onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      )}
    </>
  );
};

export default Sidebar;
