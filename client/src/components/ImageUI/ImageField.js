import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { ImageContainer } from "./ImageContainer";

const ImageField = ({
  name,
  fieldCount,
  label,
  errors,
  setFieldValue,
  className,
}) => {
  const data = useSelector((state) => state.data.singleProduct.images);

  useEffect(() => {
    if (data) {
      setFieldValue(name, data);
    }
  }, [data]);

  return (
    <div className="relative h-full w-full flex items-center justify-center gap-2">
      <label htmlFor="picture" className="text-nowrap">
        {label}
      </label>{" "}
      <div className="grid grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-4 w-full h-full gap-2 items-center justify-center">
        {/* <div className="flex w-full h-full gap-2 justify-center flex-wrap"> */}
        {[...Array(fieldCount)].map((_, index) => (
          <ImageContainer
            key={index}
            image={data?.[index]}
            hasPrimary={true}
            hasRemove={true}
            className={className}
          />
        ))}
      </div>
      <div className="absolute right-0 top-full text-center text-red-600">
        {errors}
      </div>
    </div>
  );
};

export default ImageField;
