import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
} from "@mui/material";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

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
    //   window.location.href = "/login";
    } catch (error) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <Container
    //   component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          padding: 4,
        //   boxShadow: 3,
        //   borderRadius: 2,
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Create an Account
        </Typography>

        {error && (
          <Typography
            variant="body2"
            color="error"
            align="center"
            sx={{ marginBottom: 2 }}
          >
            {error}
          </Typography>
        )}

        <form onSubmit={handleSignup}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Signup
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ marginTop: 2 }}
        >
          Already have an account?{" "}
          <a href="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
            Login
          </a>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignupPage;
