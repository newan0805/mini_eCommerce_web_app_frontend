import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productsSlice";
import {
  CircularProgress,
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Link,
} from "@mui/material";
import TableComponent from "../components/TableComponent";
import SearchBar from "../components/SearchBar";
import { Add, Star, TableRows } from "@mui/icons-material";

const MainPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
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
          // display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "row",
          gap: 2,
          // height: 10,
          // maxWidth: 800,
          // margin: "auto",
          // mt: 2,
        }}
      >
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
                  to={"/products/add-product"}
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
        <TableComponent filteredProducts={filteredProducts} />
      )}
    </Container>
  );
};

export default MainPage;
