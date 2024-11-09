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
  linkClassName,
}) => (
  <li className={`relative ${className}`} onClick={onClick}>
    {to ? (
      <Link to={to} className={`block w-full h-full ${linkClassName}`}>
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
