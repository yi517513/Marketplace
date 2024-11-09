import React from "react";
import useConfig from "../hooks/config/useConfig";

const withSlug = (WrappedComponent) => {
  console.log(`using withSlug`);
  return (props) => {
    const { slug } = props;
    const { selectedData } = useConfig({ slug });

    return <WrappedComponent originalData={selectedData} />;
  };
};

export default withSlug;
