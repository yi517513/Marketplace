import React from "react";
// import { usePathContext } from "../context/PathContext";

const withCustomPath = (WrappedComponent) => {
  return (props) => {
    const { customPath } = props;
    // const { setCustomPath } = usePathContext();

    // setCustomPath(customPath);

    return <WrappedComponent {...props} />;
  };
};

export default withCustomPath;
