import useFetchData from "../hooks/fetch/useFetchData";
import withPagination from "../Hocs/withPagination";
import withLoading from "../Hocs/withLoading";
import HistoryItem from "../components/UserCenter/HistoryItem";

const SoldHistory = () => {
  const { loading, data } = useFetchData(`getSoldHistory`);
  const PaginatedHistoryItem = withPagination(HistoryItem);
  const LoadedHistoryItem = withLoading(PaginatedHistoryItem);

  return <LoadedHistoryItem originalData={data} loading={loading} />;
};

export default SoldHistory;
