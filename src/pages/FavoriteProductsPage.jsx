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
import AlertCard from "../components/AlertCard";

const FavoriteProductsPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    type: "info",
    title: "",
    description: "",
    onConfirm: null,
  });

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);

    const fetchProducts = async () => {
      try {
        const productData = await Promise.all(
          storedFavorites.map((id) =>
            axios
              .get(`http://localhost:5000/products/${id}`)
              .then((res) => res.data)
          )
        );
        setProducts(productData);
      } catch (error) {
        // console.error("Error fetching product details", error);
      }
    };

    if (storedFavorites.length > 0) {
      fetchProducts();
    }
  }, []);

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter(
      (favoriteId) => favoriteId !== id
    );
    setFavorites(updatedFavorites);
    setProducts(products.filter((product) => product.id !== id));
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setAlert({
      show: true,
      type: "info",
      title: "Product Removed",
      description: `Product ID ${id} has been removed from your favorites.`,
      onConfirm: () => setAlert({ ...alert, show: false }),
    });
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
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Paper sx={{ padding: 2, boxShadow: 2 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {product.name || `Product ${product.id}`}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {product.description || "No description available."}
                    </Typography>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Link
                        to={`/product/${product.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button variant="contained" color="primary">
                          View Product
                        </Button>
                      </Link>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => removeFromFavorites(product.id)}
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

      {alert.show && (
        <AlertCard
          type={alert.type}
          title={alert.title}
          description={alert.description}
          onConfirm={alert.onConfirm}
        />
      )}
    </Box>
  );
};

export default FavoriteProductsPage;
