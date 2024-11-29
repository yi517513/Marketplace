import React from "react";
import { useSelector } from "react-redux";
import useFetchData from "../hooks/fetch/useFetchData";
import useCheckRoute from "../hooks/router/useCheckRoute";
import withPagination from "../Hocs/withPagination";
import { ROUTES } from "../utils/paths";

import ImageList from "../components/Modal/ImageList";

const ImageManager = () => {
  const itemsPerPage = useSelector((state) => state.common.itemsPerPage);
  const isModal = useSelector((state) => state.common.isModal);

  const { loading, data } = useFetchData(`getUserImages`);
  const PaginatedImageManager = withPagination(ImageList);
  const isEditPage = useCheckRoute([ROUTES.CREATE, ROUTES.EDIT]);

  return (
    <PaginatedImageManager
      originalData={data}
      laading={loading}
      hasSelect={isEditPage && !isModal}
      itemsPerPage={itemsPerPage}
    />
  );
};

export default ImageManager;
