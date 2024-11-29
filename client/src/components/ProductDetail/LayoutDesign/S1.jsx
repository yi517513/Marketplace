import React from "react";
import { SlideShow } from "../../ImageUI/SlideShow";
import { TextArea } from "../../UI/BaseUI";
import { ProductPaymentPanel } from "../../UI/ActionUI";

const ProductOverView = ({
  title,
  price,
  inventory,
  description,
  hasDesc,
  children,
}) => (
  <div className="grid grid-rows-[1fr_4fr_1fr] text-lg w-full h-full p-2">
    <div className="flex items-center h-full p-2">
      <h5 className="text-lg font-semibold tracking-tight text-gray-900">
        {title}
      </h5>
    </div>
    {hasDesc && (
      <div className="flex items-center h-full p-2">
        <TextArea value={description} className="h-full" />
      </div>
    )}
    <div className="flex items-center justify-between h-full p-2">
      <p className=" text-lg text-gray-700"> {`庫存: ${inventory}`}</p>
      <p className=" text-lg font-bold text-gray-700"> {`${price} 元`}</p>
    </div>
  </div>
);

const S1 = ({ productInfo }) => {
  return (
    <div className="flex justify-center items-center w-full ">
      <div className="p-4 mt-8 border-4 rounded-xl flex flex-row justify-center min-h-full gap-8 xl:max-w-[1200px] xl:h-[680px]">
        <div className=" flex basis-2/3 h-full">
          <SlideShow
            images={productInfo?.images}
            className="flex items-center overflow-hidden "
          />
        </div>
        <div className="grid grid-rows-[9fr_1fr] w-full">
          <div>
            <ProductOverView
              title={productInfo.title}
              price={productInfo.price}
              inventory={productInfo.inventory}
              description={productInfo.description}
              hasDesc={true}
            />
          </div>
          <div>
            <ProductPaymentPanel
              ownerId={productInfo.owner?._id}
              productInfo={productInfo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default S1;
