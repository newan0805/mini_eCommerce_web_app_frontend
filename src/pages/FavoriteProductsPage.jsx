// src/pages/FavoriteProductsPage.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

const FavoriteProductsPage = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Function to remove a product from favorites
  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter(
      (favoriteId) => favoriteId !== id
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
  };

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Your Favorite Products
      </Typography>

      {favorites.length > 0 ? (
        <Grid container spacing={3}>
          {favorites.map((id) => (
            <Grid item xs={12} sm={6} md={4} key={id}>
              <Paper sx={{ padding: 2, boxShadow: 2 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Product {id}
                    </Typography>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      {/* Link to the Product Detail Page */}
                      <Link
                        to={`/product/${id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button variant="contained" color="primary">
                          View Product
                        </Button>
                      </Link>

                      {/* Remove from favorites button */}
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => removeFromFavorites(id)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          You have no favorite products yet.
        </Typography>
      )}
    </Box>
  );
};

export default FavoriteProductsPage;
