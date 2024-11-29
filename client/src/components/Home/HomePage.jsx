import React from "react";
import useFetchData from "../../hooks/fetch/useFetchData";
import ProductCard from "../UI/ProductCard";
import withPagination from "../../Hocs/withPagination";
import Pagination from "../UI/Pagination";

const Home = ({ paginatedData: products, paginationActions }) => {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 ">
      <div className="flex flex-wrap justify-start gap-6">
        {products &&
          products.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              className="min-h-128"
              hasDes={false}
            />
          ))}
      </div>
      <div>
        <Pagination {...paginationActions} />
      </div>
    </div>
  );
};

const HomePage = () => {
  const { data } = useFetchData(`getAllProducts`);
  const PaginatedHome = withPagination(Home);

  return <PaginatedHome originalData={data} />;
};

export default HomePage;
