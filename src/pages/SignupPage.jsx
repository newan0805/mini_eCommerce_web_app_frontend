// src/pages/SignupPage.js
import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/vendors/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Signup successful! Please login.");
      window.location.href = "/login";
    } catch (error) {
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", padding: 3, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create an Account
      </Typography>
      <form onSubmit={handleSignup}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Signup
        </Button>
      </form>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        sx={{ marginTop: 2 }}
      >
        Already have an account? <a href="/login">Login</a>
      </Typography>
    </Box>
  );
};

export default SignupPage;
