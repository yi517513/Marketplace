import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useStoreData = (key) => {
  const [loading, setLoading] = useState(true);
  const selectedData = useSelector((state) => state.data[key]);
  console.log(`selectedData:${selectedData}`);

  useEffect(() => {
    if (selectedData) {
      setLoading(false);
    }
  }, [selectedData]);

  return { loading, selectedData };
};

export default useStoreData;
