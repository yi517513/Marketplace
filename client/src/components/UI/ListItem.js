import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListItem = ({
  label,
  value,
  icon,
  className,
  to,
  onClick,
  iconColor,
}) => (
  <li className={`li ${className}`} onClick={onClick}>
    {to ? (
      <Link to={to} className="full-link">
        {label}{" "}
        {icon && <FontAwesomeIcon icon={icon} style={{ color: iconColor }} />}{" "}
        {value}
      </Link>
    ) : (
      <>
        {label}:{" "}
        {icon && <FontAwesomeIcon icon={icon} style={{ color: iconColor }} />}{" "}
        {value}
      </>
    )}
  </li>
);

export default ListItem;
