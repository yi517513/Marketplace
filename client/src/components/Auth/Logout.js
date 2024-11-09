import React from "react";
import ListItem from "../UI/ListItem";
import useApiHandlers from "../../hooks/handler/useApiHandlers";

const Logout = ({ className, linkClassName }) => {
  const { apiHandlers } = useApiHandlers("Logout");
  const { handleLogout } = apiHandlers;

  return (
    <ListItem
      label="登出"
      to={`#`}
      onClick={handleLogout}
      className={className}
      linkClassName={linkClassName}
    />
  );
};

export default Logout;
