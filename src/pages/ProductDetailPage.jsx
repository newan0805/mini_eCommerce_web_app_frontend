// src/pages/ProductDetailPage.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product", error);
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

  return (
    <Box sx={{ padding: 3, backgroundColor: '#fff' }}>
      {product ? (
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={
              product.images?.find((img) => img.isThumbnail)?.path
                ? `http://localhost:5000${
                    product.images.find((img) => img.isThumbnail).path
                  }`
                : `http://localhost:5000${product.images?.[0]?.path || ""}`
            }
            alt={product.name}
            style={{
              width: "60%",
              height: "auto",
              objectFit: "cover",
              maxHeight: 400,
            }}
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              {product.description}
            </Typography>

            <Button
              variant="contained"
              color={product.favorite ? "error" : "primary"}
              onClick={handleFavorite}
              fullWidth
            >
              {product.favorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default ProductDetailPage;
