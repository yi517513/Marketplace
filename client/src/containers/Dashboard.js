import React, { useState } from "react";
import useDashboardConfig from "../hooks/Config/useDashboardConfig";
import PaginationContainer from "./PaginationContainer";
import SwitchContainer from "./SwitchContainer";

const Dashboard = ({ path }) => {
  // History頁面切換購買紀錄和販賣紀錄
  const [role, setRole] = useState(true);

  const { apiData, Children, handlers, isHistoryPage } = useDashboardConfig(
    path,
    role
  );

  // 分頁
  const [paginatedData, setPaginatedData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(Number(2));

  const hasData = apiData && apiData.length > 0;

  return (
    <div className="dashboard-container">
      {isHistoryPage && (
        <div className="history-list__title">
          <h2> {role ? "購買紀錄" : "販賣紀錄"}</h2>
        </div>
      )}
      <div className="dashboard-content">
        {hasData &&
          paginatedData.map((data) => <Children data={data} {...handlers} />)}
        {!hasData && <div>沒有資料</div>}
      </div>

      <div className="dashboard-pagination">
        <PaginationContainer
          originalData={apiData}
          setPaginatedData={setPaginatedData}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
        {isHistoryPage && (
          <SwitchContainer
            labelA="購買紀錄"
            labelB="販賣紀錄"
            role={role}
            setRole={setRole}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
