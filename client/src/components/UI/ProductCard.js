import React from "react";

const ProductCard = ({ product, index, navigateTo }) => {
  <div
    className="product-card"
    key={index}
    onClick={() => navigateTo(`DETAIL`, product._id)}
  >
    <div className="product-image">
      {product.images && <img src={product.images[0]?.url} />}
    </div>
    <div className="product-info">
      <ul>
        <li>{product.title}</li>
        <li>單件價格: {product.price}</li>
        <li>庫存: {product.inventory}</li>
      </ul>
    </div>
  </div>;
};

export default ProductCard;
