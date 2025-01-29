import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Box, Button, TextField, Typography } from "@mui/material";
import "../styles/login.css"; // Make sure this path is correct

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      sessionStorage.setItem("user", JSON.stringify(user));
      navigate("/students");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <Box className="login">
      <Typography variant="h4" className="h1">Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="custom-input"
      />
      
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="custom-input"
      />
      
      <Button className="btn" variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
