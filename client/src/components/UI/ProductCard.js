import React from "react";
import { NavigateDiv } from "./ActionUI";
import { ImageWithActions } from "../ImageUI/ImageContainer";
import { ROUTES } from "../../utils/paths";
import { TextArea } from "./BaseUI";

const ProductOverView = ({ title, price, inventory, description, hasDesc }) => (
  <div className="flex flex-col justify-between text-xl gap-2 w-full h-full p-2">
    <div className="h-1/6">
      <h5 className="text-lg font-semibold tracking-tight text-gray-900">
        {title}
      </h5>
    </div>
    <div className="h-1/6 flex justify-between">
      <p className=" text-lg text-gray-700"> {`庫存: ${inventory}`}</p>
      <p className=" text-lg font-bold text-gray-700"> {`${price} 元`}</p>
    </div>
    {hasDesc && (
      <div className="h-4/6">
        <TextArea value={description} className="h-full" />
      </div>
    )}
  </div>
);

const ProductCard = ({ product, className, hasDes }) => (
  <NavigateDiv
    path={ROUTES.DETAIL}
    slug={product._id}
    key={product._id}
    className={className}
  >
    <div className="h-full flex flex-col w-64 border border-gray-300 rounded-lg shadow-md overflow-hidden ">
      <div className="h-4/6">
        <ImageWithActions image={product.images[0]} />
      </div>
      <div className="h-2/6">
        <ProductOverView
          title={product.title}
          price={product.price}
          inventory={product.inventory}
          description={product.description}
          hasDes={hasDes}
        />
      </div>
    </div>
  </NavigateDiv>
);
export default ProductCard;
