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

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleFavorite = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/products/favorite/${id}`
      );
      setProduct((prev) => ({
        ...prev,
        favorite: response.data.favorite,
      }));
    } catch (error) {
      console.error("Error adding to favorites", error);
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
            onClick={handleFavorite}
            fullWidth
            sx={{ mt: 2 }}
          >
            {product.favorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetailPage;
