import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../redux/slices/productsSlice";
import { CircularProgress, Box, Container, Typography } from "@mui/material";
import TableComponent from "../components/TableComponent";
import UserBar from "../components/UserBar";
import AlertCard from "../components/AlertCard";
import TopBar from "../components/TopBar";
import axios from "axios";

const MainPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    type: "info",
    title: "",
    description: "",
    onConfirm: null,
    onCancel: null,
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setAlert({
      show: true,
      type: "error",
      title: "Delete Product",
      description:
        "Are you sure you want to delete this product? This action cannot be undone.",
      onConfirm: confirmDelete,
      onCancel: cancelDelete,
    });
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      dispatch(deleteProduct(selectedProduct._id));
      dispatch(fetchProducts());
    }
    setAlert({ show: false });
  };

  const cancelDelete = () => {
    setAlert({ show: false });
  };

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

      const updatedProducts = products.map((product) =>
        product._id === productId
          ? { ...product, favorite: !product.favorite }
          : product
      );

      dispatch({ type: "UPDATE_PRODUCTS", payload: updatedProducts });

      setAlert({
        show: true,
        type: "info",
        title: updatedProducts.favorite
          ? "Removed from Favorites"
          : "Added to Favorites",
        description: updatedProducts.favorite
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

  const filteredProducts = products.filter((product) => {
    const sku = product.sku ? product.sku.toString().toLowerCase() : "";
    const name = product.name ? product.name.toLowerCase() : "";
    const price = product.price ? product.price.toString().toLowerCase() : "";

    return (
      sku.includes(searchQuery.toLowerCase()) ||
      name.includes(searchQuery.toLowerCase()) ||
      price.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Container>
      <Box>
        <UserBar />
      </Box>

      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
      >
        Products
      </Typography>

      <TopBar
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
        searchQuery={searchQuery}
      />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableComponent
          filteredProducts={filteredProducts}
          onDelete={handleDelete}
          handleFavorite={handleFavorite}
        />
      )}
      {alert.show && (
        <AlertCard
          type={alert.type}
          title={alert.title}
          description={alert.description}
          onConfirm={alert.onConfirm}
          onCancel={alert.onCancel}
        />
      )}
    </Container>
  );
};

export default MainPage;
