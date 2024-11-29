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
  Container,
  Grid,
} from "@mui/material";
import AlertCard from "../components/AlertCard";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const navigate = useNavigate();
  
  const [productSKU, setProductSKU] = useState("");
  const [productName, setProductName] = useState("");
  const [productQTY, setProductQTY] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
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
    formData.append("sku", productSKU);
    formData.append("name", productName);
    formData.append("quantity", productQTY);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("isFavorite", false);

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        "http://localhost:5000/api/products/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlert({
        show: true,
        type: "success",
        title: "Product Added Successfully!",
        description: "Your product has been added to the inventory.",
      });
      setTimeout(() => navigate(`/`), 2000);
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
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        height: "100vh",
        flexDirection: "column",
        mx: "auto",
        mt: 5,
        p: 3,
        backgroundColor: "white",
        maxWidth: 800,
      }}
    >
      <Box sx={{ mt: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Products
          </Typography>
          <Typography sx={{ color: "#001EB9", fontSize: "20px" }}>
            {">"} Add
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} gap={2} display={"flex"} alignItems={"center"}>
              <Typography>SKU</Typography>
              <TextField
                className="fields"
                // label="SKU"
                sx={{ width: "40%" }}
                margin="normal"
                variant="outlined"
                value={productSKU}
                onChange={(e) => setProductSKU(e.target.value)}
                required
              />
              {/* </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              display={"flex"}
              gap={2}
              alignItems={"center"}
            > */}
              <Typography>Name</Typography>
              <TextField
                className="fields"
                // label="Name"
                fullWidth
                margin="normal"
                variant="outlined"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              gap={2}
              display={"flex"}
              alignItems={"center"}
            >
              <Typography>Price</Typography>
              <TextField
                className="fields"
                // label="Price"
                type="number"
                fullWidth
                margin="normal"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              display={"flex"}
              gap={2}
              alignItems={"center"}
            >
              <Typography>Product QTY</Typography>
              <TextField
                className="fields"
                // label="Name"
                fullWidth
                margin="normal"
                variant="outlined"
                value={productQTY}
                onChange={(e) => setProductQTY(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Typography>Product Description</Typography>
              <Typography color="#969191">
                A small description about the product
              </Typography>
              <TextField
                className="fields"
                // label="Description"
                fullWidth
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12} display={"flex"}>
              <Box sx={{ width: "20%" }}>
                <Typography>Product Images</Typography>
                <Typography color="#969191" pt={1}>
                  JPEG, PNG, SVG or GIF (Maximum file size 50MB)
                </Typography>
              </Box>
              <Box>
                <FormControl fullWidth margin="normal">
                  <Input
                    id="upload-images"
                    type="file"
                    style={{ display: "none" }}
                    inputProps={{ multiple: true }}
                    onChange={handleImageChange}
                  />
                  <label htmlFor="upload-images" className="upload-label">
                    <Typography> Add Images</Typography>
                  </label>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "right" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 3, backgroundColor: "#001EB9", p: 1.2, width: "30%" }}
              >
                Add Product
              </Button>
            </Grid>
          </Grid>
        </form>

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

export default AddProductPage;
