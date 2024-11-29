import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import SearchBar from "../components/SearchBar";
import { Star } from "@mui/icons-material";
import { Link } from "react-router-dom";

const TopBar = ({ handleSearchChange, handleSearchSubmit, searchQuery }) => {
    return (
        <Container
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                gap: 2,
                mt: 2,
                flexWrap: "wrap",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    flex: 1,
                    gap: 2,
                }}
            >
                <SearchBar
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onPress={handleSearchSubmit}
                />
                <Link
                    to="/add-product"
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <Button variant="contained" color="primary" sx={{ borderRadius: 50 }}>
                        New Product
                    </Button>
                </Link>
                <Button
                    color="primary"
                    sx={{
                        minWidth: "40px",
                        height: "40px",
                        borderRadius: "50%",
                    }}
                >
                    <Star />
                </Button>
            </Box>
        </Container>
    );
};

export default TopBar;
