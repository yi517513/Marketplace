import React from "react";
import ListItem from "../../UI/ListItem";
import Button from "../../UI/Button";

const ProductItem = ({
  item: product,
  navigateTo,
  toggleProductStatus,
  deleteProduct,
}) => {
  if (!product) {
    return null;
  }

  const hasPendingShipment = product.pendingShipment > 0;
  const isProductStatus = product.status === "available";
  const hasInventory = product.inventory > 0;

  // 渲染出移交數量或狀態
  const renderStatus = () => {
    if (hasPendingShipment) {
      return <ListItem label="移交數量" value={product.pendingShipment} />;
    }
    return (
      <ListItem label="狀態" value={isProductStatus ? "上架中" : "已下架"} />
    );
  };

  return (
    <div className="items-list">
      <ul>
        {renderStatus()}
        <ListItem label="標題" value={product.title} />
        <ListItem label="價格" value={product.price} />
        <ListItem
          label="庫存"
          value={product.inventory}
          className={hasInventory ? "" : "unavailable"}
        />
        <ListItem label="詳細" value={product.description} />
      </ul>
      <div className="btn-set">
        <Button
          label="瀏覽"
          onClick={() => navigateTo(`DETAIL`, product._id)}
        />
        <Button label="編輯" onClick={() => navigateTo(`EDIT`, product._id)} />
        <Button
          label={isProductStatus ? "下架" : "上架"}
          onClick={() => toggleProductStatus(product._id)}
          disabled={!hasInventory}
        />
        <Button
          label="刪除"
          onClick={() => deleteProduct(product)}
          disabled={hasPendingShipment}
        />
      </div>
    </div>
  );
};

export default ProductItem;
