import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PublicService from "../../services/publicService";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import DOMPurify from "dompurify";
import { NOTIFICATION_TYPES } from "../../utils/constants";
import useCRUD from "../../hooks/useCRUD";
import useNavigation from "../../hooks/useNavigation";
import { PATHS } from "../../utils/paths";
const { WARN } = NOTIFICATION_TYPES;

const ProductDetail = () => {
  const { isAuthenticated, userId } = useSelector((state) => state.auth);
  const { getData } = useCRUD();
  const { navigateTo } = useNavigation();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState(null);
  const { loading } = useSelector((state) => state.auth);
  const { productId } = useParams();
  const [previewImageSrc, setPreviewImageSrc] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const navigate = useNavigate();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    getData(PublicService.getProduct, productId, (success, data) => {
      if (success) {
        const cleanDescription = DOMPurify.sanitize(
          data.description.replace(/\n/g, "<br />")
        );
        data.description = cleanDescription;
        setProduct(data);
        setImages(data.images);
      }
    });
  }, [getData]);

  if (loading) {
    return <div>加載中...</div>;
  }

  if (!product) {
    return <div>商品資訊未找到</div>;
  }

  const handleSetCurrentPage = (count) => {
    if (currentPage >= images.length - 1 && count === 1) {
      setCurrentPage(0);
    } else if (currentPage <= 0 && count === -1) {
      setCurrentPage(images.length - 1);
    } else {
      setCurrentPage((prev) => prev + count);
    }
  };

  const handleContactSeller = () => {
    if (!isAuthenticated) {
      const notification = { message: "尚未登入", type: WARN };
      navigate(PATHS.LOGIN, product._id, notification);
    } else {
      alert(
        `已登入，使用socket io製作即時通訊功能。賣家資訊為: ${product.publisherId}`
      );
    }
  };

  const handleAddProductToCart = () => {};

  const handleBuyProduct = () => {
    if (!isAuthenticated) {
      const notification = {
        message: "尚未登入",
        type: NOTIFICATION_TYPES.WARN,
      };
      navigateTo(PATHS.LOGIN, product._id, notification);
    } else {
      const paymentInfo = {
        buyerId: userId,
        sellerId: product.publisherId._id,
        productId: product._id,
        price: product.price,
        purchaseQuantity,
      };
      console.log(`${PATHS.PAYMENT_OPTIONS}/${userId}`);
      navigateTo(`${PATHS.PAYMENT_OPTIONS}/${userId}`, paymentInfo);
    }
  };

  const previewImage = (e, index) => {
    e.stopPropagation();
    setPreviewImageSrc(images[index].url);
    setIsPreviewOpen(true);
  };

  return (
    <div className="detail-area">
      <div className="detail-container">
        <div className="top-area">
          <div className="image-container">
            {images && (
              <div className="image-wrapper">
                <div className="image-cover">
                  <div className="pagination left">
                    <button
                      onClick={() => {
                        handleSetCurrentPage(-1);
                      }}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                  </div>
                  <img
                    src={images[currentPage]?.url}
                    alt={`Product Image`}
                    onClick={(e) => previewImage(e, currentPage)}
                  />
                  <div className="pagination right">
                    <button
                      onClick={() => {
                        handleSetCurrentPage(+1);
                      }}
                    >
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </div>
                </div>

                <div className="image-list">
                  {images.map((image, index) => (
                    <div
                      className={
                        currentPage === index
                          ? "image-pieces selected"
                          : "image-pieces"
                      }
                      key={index}
                      onClick={() => setCurrentPage(index)}
                    >
                      <img src={image.url} alt={`Product Image ${index}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="feature-wrapper">
            <div className="product-info">
              <h1>{product.title}</h1>
              <p>單件價格: {product.price}</p>
              <div className="quantity-control">
                <p>購買數量: </p>
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={() => {
                    setPurchaseQuantity((prev) => prev - 1);
                  }}
                  disabled={purchaseQuantity === 1}
                >
                  -
                </button>
                <input
                  className="quantity-input"
                  value={purchaseQuantity}
                  onChange={(e) => setPurchaseQuantity(Number(e.target.value))}
                  min="1"
                />
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={() => {
                    setPurchaseQuantity((prev) => prev + 1);
                  }}
                  disabled={purchaseQuantity === product.inventory}
                >
                  +
                </button>
                <p>庫存: {product.inventory}</p>
              </div>

              <button className="feature" onClick={handleContactSeller}>
                聯繫賣家
              </button>
              <button className="feature" onClick={handleAddProductToCart}>
                加入購物車
              </button>
              <button
                className="feature"
                onClick={() => handleBuyProduct()}
                disabled={product.inventory <= 0}
              >
                立即購買
              </button>
            </div>
          </div>
        </div>
        <div className="description">
          {/* <p>描述: {product.description}</p> */}
          <p>描述:</p>
          <p dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
        {isPreviewOpen && (
          <div
            className="preview-modal"
            onClick={() => setIsPreviewOpen(false)}
          >
            <div className="close-content" onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={() => setIsPreviewOpen(false)}>
                &times;
              </span>
            </div>
            <div className="preview-content">
              <img src={previewImageSrc} alt="Preview" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
