import React, { useState } from "react";
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
import AlertCard from "../components/AlertCard";

const AddProductPage = () => {
  const [productSKU, setProductSKU] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    type: "success",
    title: "",
    description: "",
  });

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
      const response = await axios.post(
        "http://localhost:5000/api/products/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAlert({
        show: true,
        type: "success",
        title: "Product Added Successfully!",
        description: "Your product has been added to the inventory.",
      });
    } catch (error) {
      console.error("Error adding product", error);
      setAlert({
        show: true,
        type: "error",
        title: "Failed to Add Product",
        description:
          "An error occurred while adding the product. Please try again.",
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
        Add Product
      </Typography>
      <form onSubmit={handleSubmit}>
      <TextField
          label="SKU"
          fullWidth
          margin="normal"
          variant="outlined"
          value={productSKU}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
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
          <InputLabel htmlFor="upload-images">Upload Images</InputLabel>
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
          Add Product
        </Button>
      </form>
      {alert.show && (
        <AlertCard
          type={alert.type}
          title={alert.title}
          description={alert.description}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </Box>
  );
};

export default AddProductPage;
