import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  _id: string;
  productName: string;
  productPrice?: number;
  imageUrl?: string;
  productCategory?: string;
  productDesc?: string;
}

const Shop = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const showProduct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/seller/all-products`
      );
      setProduct(response.data.product);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    showProduct();
  }, []);
  return (
    <>
      <div>
        {product.length > 0 &&
          product.map((item) => {
            return (
              <div key={item._id}>
                <p>{item.productDesc}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Shop;
