import React from "react";
import ListItem from "../components/UI/ListItem";
import Logout from "../components/Auth/Logout";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const withAuthTools = (WrappedComponent) => {
  return (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
      <WrappedComponent
        {...props}
        authTools={
          <>
            <ListItem
              label="登入"
              icon={faCircle}
              iconColor={isAuthenticated ? "#00ff00" : "#ff0000"}
            />
            <Logout className="modal-button" isModal={true} />
          </>
        }
      />
    );
  };
};

export default withAuthTools;
