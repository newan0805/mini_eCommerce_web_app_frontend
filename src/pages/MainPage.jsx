import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productsSlice";
import {
  TextField,
  CircularProgress,
  Box,
  Container,
  Typography,
} from "@mui/material";
import TableComponent from "../components/TableComponent";

const MainPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter products based on search query (product name)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      {/* Header Section */}
      {/* <Box
        sx={{
          padding: 4,
          backgroundColor: "#f4f4f4",
          marginBottom: 4,
          borderRadius: 2,
        }}
      > */}
      <Typography variant="h4" align="center" gutterBottom>
        Vendor Portal
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search for products"
        onChange={handleSearch}
        value={searchQuery}
        sx={{ marginTop: 2 }}
      />
      {/* <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Add Product
          </Button>
        </Box> */}
      {/* </Box> */}

      {/* Loading or Product Table */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableComponent filteredProducts={filteredProducts} />
      )}
    </Container>
  );
};

export default MainPage;
