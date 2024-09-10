import useFetchData from "../fetch-Data/useFetchData";
import { useLocation } from "react-router-dom";

const useHomeConfig = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [products, setProducts] = useState();

  const { navigateTo } = useNavigation();

  const fetchData = useFetchData(currentPath);

  useEffect(() => {
    fetchData(setProducts);
  }, [currentPath, fetchData, products]);

  return { products, navigateTo };
};

export default useHomeConfig;
