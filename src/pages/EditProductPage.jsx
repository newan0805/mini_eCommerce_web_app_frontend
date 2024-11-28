// src/pages/EditProductPage.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputLabel,
  Input,
  FormControl,
} from "@mui/material";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        const { name, description, quantity, images } = response.data;
        setProduct(response.data);
        setProductName(name);
        setDescription(description);
        setQuantity(quantity);
        setImages(images);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    setImages(Array.from(files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("quantity", quantity);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await axios.put(`http://localhost:5000/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product updated successfully!");
      navigate(`/product/${id}`);
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Edit Product
      </Typography>
      {product ? (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <TextField
            label="Quantity"
            type="number"
            fullWidth
            margin="normal"
            variant="outlined"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="upload-images">Upload New Images</InputLabel>
            <Input
              id="upload-images"
              type="file"
              inputProps={{ multiple: true }}
              onChange={handleImageChange}
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Update Product
          </Button>
        </form>
      ) : (
        <Typography variant="body1" align="center">
          Loading product details...
        </Typography>
      )}
    </Box>
  );
};

export default EditProductPage;
