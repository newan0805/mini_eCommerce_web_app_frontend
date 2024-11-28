// src/pages/SearchResultsPage.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
} from "@mui/material";

const SearchResultsPage = () => {
  const { search } = useLocation(); // Get the URL query parameters
  const query = new URLSearchParams(search).get("query"); // Extract the 'query' parameter from the URL
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/products/search?query=${query}`
        );
        setResults(response.data); // Set the fetched results
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults(); // Fetch products when query is available
    }
  }, [query]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Search Results for "{query}"
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {results.length > 0 ? (
            <Grid container spacing={2}>
              {results.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <Card sx={{ display: "flex", flexDirection: "column" }}>
                    <CardMedia
                      component="img"
                      alt={product.name}
                      height="200"
                      image={
                        product.images.length > 0 ? product.images[0].url : ""
                      }
                    />
                    <CardContent>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        paragraph
                      >
                        {product.description}
                      </Typography>
                      {/* Add more product details like price, etc. */}
                      <Button variant="contained" fullWidth>
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h6" color="textSecondary">
              No products found matching your search.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchResultsPage;
