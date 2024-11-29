import React from "react";
import { ListItem } from "../components/UI/BaseUI";
import { LogoutNav } from "../components/UI/ActionUI";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";

const withAuthTools = (WrappedComponent) => {
  return (props) => {
    const { isAuthenticated } = useAuth();

    return (
      <WrappedComponent {...props}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border">
            <h3>登入狀態</h3>
            <ListItem
              icon={faCircle}
              className={isAuthenticated ? "text-[#00ff00]" : "text-[#ff0000]"}
            />
          </div>
          {isAuthenticated && (
            <div className="border">
              <LogoutNav
                label="登出"
                liClassName="hover:text-dark-gray cursor-pointer"
                isModal={true}
              />
            </div>
          )}
          <div className="border mr-8"> {props.children}</div>
        </div>
      </WrappedComponent>
    );
  };
};

export default withAuthTools;
