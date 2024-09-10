// import React from "react";
// import useFormEntry from "../hooks/Form/useFormEntry";
// import { useSelector } from "react-redux";
// import Publish from "../components/UserCenter/Seller/Publish";

// const Form = React.memo(() => {
//   const { apiLoading, dataReady } = useSelector((state) => state.loading);
//   const { Component, handlers, initialValues, validationSchema } =
//     useFormEntry();

//   if (!dataReady || apiLoading) {
//     return <div>loading...</div>;
//   }

//   console.log("Form rendered");

//   return (
//     <Publish
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       {...handlers}
//     />
//   );
// });

// export default Form;
