import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";
import AlertCard from "../components/AlertCard"; 
const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({
    show: false,
    type: "info",
    title: "",
    description: "",
    onConfirm: null,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleFavorite = async (productId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      const response = await axios.post(
        `http://localhost:5000/api/favorites/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProduct((prev) => ({
        ...prev,
        favorite: !prev.favorite,
      }));

      setAlert({
        show: true,
        type: "info",
        title: product.favorite ? "Removed from Favorites" : "Added to Favorites",
        description: product.favorite
          ? "The product has been removed from your favorites."
          : "The product has been added to your favorites.",
        onConfirm: () => setAlert({ ...alert, show: false }),
      });
      setTimeout(() => (window.location.href = "/"), 2000);
    } catch (error) {
      console.error("Error adding to favorites", error);

      setAlert({
        show: true,
        type: "error",
        title: "Error",
        description: "Failed to update favorites. Please try again.",
        onConfirm: () => setAlert({ ...alert, show: false }), 
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          Product not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Card
        sx={{
          maxWidth: 400,
          margin: "0 auto",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardMedia
          component="img"
          image={
            product.images?.find((img) => img.isThumbnail)?.path
              ? `http://localhost:5000${product.images.find((img) => img.isThumbnail).path}`
              : `http://localhost:5000${product.images?.[0]?.path || ""}`
          }
          alt={product.name}
          sx={{
            height: 300,
            objectFit: "cover",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            {product.description}
          </Typography>
          <Typography variant="h6" color="primary" gutterBottom>
            Price: ${product.price}
          </Typography>
          <Button
            variant="contained"
            color={product.favorite ? "error" : "primary"}
            onClick={() => handleFavorite(product._id)}
            fullWidth
            sx={{ mt: 2 }}
          >
            {product.favorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        </CardContent>
      </Card>

      {alert.show && (
        <AlertCard
          type={alert.type}
          title={alert.title}
          description={alert.description}
          onConfirm={alert.onConfirm}
        />
      )}
    </Container>
  );
};

export default ProductDetailPage;
