import React from "react";
import { TextField, IconButton, Box, InputAdornment, Typography } from "@mui/material";
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
        gap: 2,
        margin: "auto",
        width: 400,
        maxWidth: 800,
      }}
      >
      <TextField
        // label="Search products"
        value={value}
        onChange={onChange}
        variant="outlined"
        fullWidth
        sx={{
          borderRadius: 50,
          "& .MuiOutlinedInput-root": {
            borderRadius: 50,
            paddingRight: 2,
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {/* <Typography>Search</Typography> */}
              <IconButton
                type="submit"
                onClick={onPress}
                edge="end"
                sx={{
                  backgroundColor: "primary.main",
                  color: "#fff",
                  borderRadius: "50%",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
