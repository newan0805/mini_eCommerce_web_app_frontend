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
      <Container
        sx={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 2,
          mt: 2,
        }}
      >
        <UserBar />
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold" }}
          align="left"
          gutterBottom
        >
          Products
        </Typography>
        <Container>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12} sm={9}>
                <SearchBar
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onPress={handleSearchSubmit}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
              >
                <Link
                  to={"/add-product"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button variant="contained" color="primary">
                    New Product
                  </Button>
                </Link>
                <Button color="primary">
                  <Star />
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Container>

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
