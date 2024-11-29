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
import AlertCard from "../components/AlertCard";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({
    show: false,
    type: "success",
    title: "",
    description: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setAlert({
        show: true,
        type: "error",
        title: "Signup Failed",
        description: "Please fill in all fields.",
      });
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/vendors/register", {
        name,
        email,
        password,
      });

      setAlert({
        show: true,
        type: "success",
        title: "Signup Successful",
        description: "Your account has been created! Please log in.",
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      setAlert({
        show: true,
        type: "error",
        title: "Signup Failed",
        description: "An error occurred while creating your account. Please try again.",
      });
    }
  };

  const handleConfirm = () => {
    setAlert({ ...alert, show: false });
  };

  const handleCancel = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <Container
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
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Create an Account
        </Typography>

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

        {alert.show && (
          <AlertCard
            show={alert.show}
            type={alert.type}
            title={alert.title}
            description={alert.description}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </Box>
    </Container>
  );
};

export default SignupPage;
