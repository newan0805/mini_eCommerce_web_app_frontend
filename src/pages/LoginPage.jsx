import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/vendors/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("authToken", data.token);

      alert("Login successful!");
      window.location.href = "/";
    } catch (error) {
      alert("Login failed. Please check your credentials.");
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
        height: "100vh",
        backgroundColor: "#fff",
        borderRadius: "20",
      }}
    >
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
        <Box>
          <Typography variant="h4" align="center" gutterBottom>
            Vendor Login
          </Typography>

          <form onSubmit={handleLogin}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
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
                  Login
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
            Dont have an account?{" "}
            <a
              href="/signup"
              style={{ textDecoration: "none", color: "#1976d2" }}
            >
              Signup
            </a>
          </Typography>
        </Box>
      </Container>
    </Container>
  );
};

export default LoginPage;
