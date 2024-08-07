import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicService from "../../services/publicService";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const { productId } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await PublicService.getProduct(productId);
        setProduct(response.data);
        console.log(response.data.images);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [productId]);

  if (loading) {
    return <div>加載中...</div>;
  }

  return (
    <div>
      {isAuthenticated && <p>會員你好</p>}
      <h1>商品詳情</h1>
      <p>標題: {product.title}</p>
      <p>價格: {product.price}</p>
      <p>庫存: {product.inventory}</p>
      <p>描述: {product.description}</p>
      <div>
        {product.images &&
          product.images.map((image, index) => (
            <img key={index} src={image.url} alt={`Product Image ${index}`} />
          ))}
      </div>
    </div>
  );
};

export default ProductDetail;
