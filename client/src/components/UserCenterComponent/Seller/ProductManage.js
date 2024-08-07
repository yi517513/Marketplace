import React, { useState, useEffect } from "react";
import ProductService from "../../../services/productService ";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNotification } from "../../../redux/slices/authSlice";

const ProductManage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await ProductService.getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, []);

  // 當前頁面最後一個產品的索引
  const indexOfLastProduct = currentPage * itemsPerPage;
  // 當前頁面第一個產品的索引
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  // 當前頁面顯示的產品列表
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // 處理上一頁和下一頁
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (indexOfLastProduct < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleNavigateToProductDetail = (product) => {
    navigate(`/productDetail/${product._id}`, {
      state: {
        title: product.title,
        price: product.price,
        inventory: product.inventory,
        images: product.images,
        description: product.description,
      },
    });
  };

  const handleUpdateProduct = (product) => {
    navigate(`/userCenter/publishForm`, {
      state: {
        title: product.title,
        price: product.price,
        inventory: product.inventory,
        images: product.images,
        description: product.description,
        productId: product._id,
      },
    });
  };

  const handleDeleteProduct = async (product) => {
    dispatch(
      setNotification({
        visible: true,
        message: "正在刪除.....",
      })
    );
    try {
      const response = await ProductService.deleteProduct(product._id);
      setProducts((prevProduct) =>
        prevProduct.filter((prevProduct) => prevProduct !== product)
      );
      dispatch(
        setNotification({
          visible: true,
          message: response.data,
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        setNotification({
          visible: true,
          message: error.response.data,
          type: "error",
        })
      );
    }
  };

  return (
    <div className="productManage-area">
      {" "}
      <div className="product-wrapper">
        {products.length === 0 ? (
          <div>沒有產品可顯示</div>
        ) : (
          currentProducts.map((product, index) => (
            <div className="product-list" key={index}>
              <ul>
                <li>標題: {product.title}</li>
                <li>價格: {product.price}</li>
                <li>庫存: {product.inventory}</li>
                <li>詳細: {product.description}</li>
              </ul>
              <div className="btn-set">
                <button onClick={() => handleNavigateToProductDetail(product)}>
                  瀏覽
                </button>
                <button onClick={() => handleUpdateProduct(product)}>
                  編輯
                </button>
                <button onClick={() => handleDeleteProduct(product)}>
                  刪除
                </button>
              </div>
            </div>
          ))
        )}{" "}
      </div>
      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          上一頁
        </button>
        <button
          onClick={handleNext}
          disabled={indexOfLastProduct >= products.length}
        >
          下一頁
        </button>
      </div>
    </div>
  );
};

export default ProductManage;
