// src/pages/FavoriteProductsPage.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FavoriteProductsPage = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Function to remove a product from favorites
  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter(
      (favoriteId) => favoriteId !== id
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
  };

  return (
    <div>
      <h1>Your Favorite Products</h1>
      {favorites.length > 0 ? (
        <div>
          {favorites.map((id) => (
            <div key={id}>
              {/* Link to the Product Detail Page */}
              <Link to={`/product/${id}`}>
                <button>View Product {id}</button>
              </Link>

              {/* Remove from favorites button */}
              <button onClick={() => removeFromFavorites(id)}>
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no favorite products yet.</p>
      )}
    </div>
  );
};

export default FavoriteProductsPage;
