import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListItem = ({ label, value, icon, className, to, onClick }) => (
  <li className={className} onClick={onClick}>
    {to ? (
      <Link to={to}>
        {label} {icon && <FontAwesomeIcon icon={icon} />} {value}
      </Link>
    ) : (
      <>
        {label}: {icon && <FontAwesomeIcon icon={icon} />} {value}
      </>
    )}
  </li>
);

export default ListItem;
