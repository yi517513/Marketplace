// import React from "react";
// import useManagementEntry from "../hooks/Management/useManagementEntry";
// import Pagination from "../components/Common/Pagination";
// import usePagination from "../hooks/pagination/usePagination";
// import { useSelector } from "react-redux";

// const Management = React.memo(() => {
//   const { apiLoading, dataReady } = useSelector((state) => state.loading);

//   const { datas, ComponentMap, handlers } = useManagementEntry();

//   const { currentDatas, paginationProps } = usePagination(datas, 6);

//   if (!dataReady || apiLoading) {
//     return <div>loading...</div>;
//   }

//   return (
//     <div className="management-area">
//       <div className="list-wrapper">
//         {currentDatas?.map((item) => (
//           <ComponentMap key={item._id} item={item} {...handlers} />
//         ))}
//       </div>
//       <div className="management-pagination">
//         {<Pagination {...paginationProps} />}
//       </div>
//     </div>
//   );
// });

// export default Management;
