import React from "react";
import HomePage from "../components/Home/HomePage";
import useHomeConfig from "../hooks/Config/useHomeConfig";

const HomeContainer = () => {
  const { products, navigateTo } = useHomeConfig;

  if (loading) {
    return <div>Loading....</div>;
  }

  return <HomePage products={products} navigateTo={navigateTo} />;
};

export default HomeContainer;
