import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Card,
  FormControl,
  Input,
} from "@mui/material";
import AlertCard from "../components/AlertCard";
import { useParams, useNavigate } from "react-router-dom";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for product details
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
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      const product = response.data;
      setProductSKU(product.sku);
      setProductName(product.name);
      setProductQTY(product.quantity);
      setPrice(product.price);
      setDescription(product.description);
      setImages(product.images || []);
    } catch (error) {
      // console.error("Error fetching product", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleImageChange = (e) => {
    const files = e.target.files;
    setImages(Array.from(files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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

      const response = await axios.put(
        `http://localhost:5000/api/products/${id}`,
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
        title: "Product Updated Successfully!",
        description: "Your product has been updated.",
      });
      setTimeout(() => navigate(`/products/${id}`), 2000);
    } catch (error) {
      // console.error("Error updating product", error);
      setAlert({
        show: true,
        type: "error",
        title: "Failed to Update Product",
        description:
          "An error occurred while updating the product. Please try again.",
      });
    } finally {
      setLoading(false);
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
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column",
        mx: "auto",
        mt: 5,
        p: 3,
        backgroundColor: "#fff",
        maxWidth: 800,
      }}
    >
      <Box sx={{ backgroundColor: "#fff", width: 600 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} gap={2} display={"flex"} alignItems={"center"}>
              <Typography>SKU</Typography>
              <TextField
                sx={{ width: "40%" }}
                margin="normal"
                variant="outlined"
                value={productSKU}
                onChange={(e) => setProductSKU(e.target.value)}
                required
              />
              <Typography>Name</Typography>
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>Price</Typography>
              <TextField
                type="number"
                fullWidth
                margin="normal"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>Product QTY</Typography>
              <TextField
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
              <TextField
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

            <Grid item xs={12} display={"flex"} gap={2}>
              <Box sx={{ width: "50%" }}>
                <img
                  src={
                    images?.find((img) => img.isThumbnail)
                      ? `http://localhost:5000${images.find((img) => img.isThumbnail).path
                      }`
                      : images?.[0]?.path
                        ? `http://localhost:5000${images[0].path}`
                        : "default_image_path_here"
                  }
                  alt={productName}
                  style={{
                    // height: "40%",
                    width: "100%",
                    objectFit: "cover",
                    maxHeight: 400,
                  }}
                />
              </Box>
              {/* </Grid>

            <Grid item xs={12} display={"flex"}> */}
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
                sx={{
                  mt: 3,
                  backgroundColor: "#001EB9",
                  p: 1.2,
                  width: "30%",
                }}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Product"}
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

export default EditProductPage;
