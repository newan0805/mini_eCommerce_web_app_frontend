import React from "react";
import { TextField, Button, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ value, onChange, onPress }) => {
  return (
    <Box
      component="form"
      onSubmit={onPress}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "row",
        gap: 2,
        width: "100%",
        // height: 10,
        maxWidth: 800,
        margin: "auto",
        // mt: 2,
      }}
    >
      <TextField
        label="Search products"
        value={value}
        onChange={onChange}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<SearchIcon />}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
