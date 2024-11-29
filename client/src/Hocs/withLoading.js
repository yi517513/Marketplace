import React from "react";

const withLoading = (WrappedComponent) => {
  return (props) => {
    const { loading, ...otherProps } = props;

    if (loading) {
      return <div>loading....</div>;
    }

    if (!loading) {
      if (props?.originalData?.length <= 0) {
        return <div>沒有資料。。。</div>;
      }
    }

    return <WrappedComponent {...otherProps} />;
  };
};

export default withLoading;
