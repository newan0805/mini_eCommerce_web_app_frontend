// src/components/SearchBar.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const history = useHistory();

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      history.push(`/search?query=${query}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
