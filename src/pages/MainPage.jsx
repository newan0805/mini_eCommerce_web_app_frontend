import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../redux/slices/productsSlice";
import {
  CircularProgress,
  Box,
  Container,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import TableComponent from "../components/TableComponent";
import SearchBar from "../components/SearchBar";
import { Star } from "@mui/icons-material";
import UserBar from "../components/UserBar";
import { Link } from "react-router-dom";
import AlertCard from "../components/AlertCard";
import TopBar from "../components/TopBar";

const MainPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const [searchQuery, setSearchQuery] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    setOpenAlert(true);
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      dispatch(deleteProduct(selectedProduct._id));
      dispatch(fetchProducts());
    }
    setOpenAlert(false);
  };

  const cancelDelete = () => {
    setOpenAlert(false);
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
      
      <TopBar handleSearchChange={handleSearchChange} handleSearchSubmit={handleSearchSubmit} searchQuery={searchQuery} />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableComponent
          filteredProducts={filteredProducts}
          onDelete={handleDelete}
        />
      )}
      {openAlert && (
        <AlertCard
          type="error"
          title="Delete Product"
          description="Are you sure you want to delete this product? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </Container>
  );
};

export default MainPage;
