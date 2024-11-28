// src/pages/MainPage.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";
import { Link } from "react-router-dom";

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
    <div className="main-page">
      <header className="main-page-header">
        <h1>Vendor Portal</h1>
        <input
          type="text"
          placeholder="Search for products"
          onChange={handleSearch}
          value={searchQuery}
          className="search-bar"
        />
      </header>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <Link to={`/product/${product._id}`} className="product-link">
                  <div className="product-image">
                    {product.images.length > 0 && (
                      <img
                        src={
                          product.images.find((img) => img.isThumbnail)
                            ? product.images.find((img) => img.isThumbnail).url
                            : product.images[0].url
                        }
                        alt={product.name}
                        className="product-img"
                      />
                    )}
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MainPage;
