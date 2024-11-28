// src/pages/SearchResultsPage.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

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
    <div>
      <h1>Search Results for "{query}"</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {results.length > 0 ? (
            results.map((product) => (
              <div key={product._id}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                {/* You can add images, prices, etc. */}
              </div>
            ))
          ) : (
            <p>No products found matching your search.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
