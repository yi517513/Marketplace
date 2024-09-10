import React from "react";
import ProductCard from "../UI/ProductCard";

const HomePage = ({ products, navigateTo }) => {
  return (
    <div className="home-container">
      <div className="home-main-wrapper">
        <div className="home-products-list">
          {products &&
            products.map((product, index) => (
              <ProductCard
                product={product}
                index={index}
                navigateTo={navigateTo}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
