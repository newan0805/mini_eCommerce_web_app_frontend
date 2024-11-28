// src/pages/ProductListPage.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productsSlice";
import "./ProductListPage.css";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error loading products: {error}</p>;
  }

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              {product.images.length > 0 && (
                <img
                  src={
                    product.images.find((img) => img.isThumbnail)?.url ||
                    product.images[0].url
                  }
                  alt={product.name}
                  className="thumbnail-img"
                />
              )}
            </div>
            <div className="product-info">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>SKU: {product.sku}</p>
              <p>Quantity: {product.quantity}</p>
              <button className="favorite-btn">
                {product.isFavorite ? "Unfavorite" : "Favorite"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
