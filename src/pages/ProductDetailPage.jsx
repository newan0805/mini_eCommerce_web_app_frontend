// src/pages/ProductDetailPage.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      setProduct(response.data);
    };

    fetchProduct();
  }, [id]);

  const handleFavorite = async () => {
    // Update product's favorite status
    try {
      const response = await axios.post(
        `http://localhost:5000/products/favorite/${id}`
      );
      setProduct((prev) => ({
        ...prev,
        favorite: response.data.favorite,
      }));
    } catch (error) {
      console.error("Error adding to favorites", error);
    }
  };

  return (
    <div>
      {product ? (
        <>
          <img src={product.mainImage} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <button onClick={handleFavorite}>
            {product.favorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetailPage;
