import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  TableContainer,
  Table,
  TableHead, TableRow, TableCell, TableBody,
  IconButton
} from "@mui/material";

import { Star } from "@mui/icons-material";

const FavoriteProductsPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({
    show: false,
    type: "info",
    title: "",
    description: "",
    onConfirm: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        const response = await axios.get(
          `http://localhost:5000/api/favorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFavorites(response.data.favorites ?? []);
        setProducts(response.data.favorites ?? []);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setAlert({
          show: true,
          type: "error",
          title: "Error",
          description: "Failed to fetch favorite products. Please log in again.",
          onConfirm: () => navigate("/login"),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [navigate]);

  const removeFromFavorites = async (productId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      await axios.post(`http://localhost:5000/api/favorites/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavorites((prevFavorites) =>
        prevFavorites.filter((id) => id !== productId)
      );
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      setAlert({
        show: true,
        type: "info",
        title: "Product Removed",
        description: `Product has been removed from your favorites.`,
        onConfirm: () => setAlert({ ...alert, show: false }),
      });
    } catch (error) {
      console.error("Error removing favorite:", error);
      setAlert({
        show: true,
        type: "error",
        title: "Error",
        description: "Failed to remove the product from favorites.",
        onConfirm: () => setAlert({ ...alert, show: false }),
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Your Favorite Products
      </Typography>

      {favorites.length > 0 ? (
        <TableContainer sx={{ bgcolor: "#fff", mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "#001EB9" }}>
                  SKU
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#001EB9" }}>
                  IMAGE
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#001EB9" }}>
                  PRODUCT NAME
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#001EB9" }}>
                  PRICE
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {favorites.map((product) => (
                <TableRow key={product._id}>
                  <TableCell sx={{ color: "#969191" }}>
                    <Link
                      to={`/products/${product._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      #{product.sku}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <img
                      src={
                        product.images?.find((img) => img.isThumbnail)?.path
                          ? `http://localhost:5000${product.images.find((img) => img.isThumbnail).path
                          }`
                          : `http://localhost:5000${product.images?.[0]?.path || ""
                          }`
                      }
                      alt={product.name}
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => { }}>
                      <Star />
                    </IconButton>
                  </TableCell>
                </TableRow>))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          You have no favorite products yet.
        </Typography>
      )}

      {alert.show && (
        <AlertCard
          type={alert.type}
          title={alert.title}
          description={alert.description}
          onConfirm={alert.onConfirm}
        />
      )}
    </Box>
  );
};

export default FavoriteProductsPage;
