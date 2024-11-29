import React from "react";
import { Button, NavItem } from "../../UI/BaseUI";
import { MENU_CONFIG_MD } from "../../../utils/constants";
import { CollapsibleSection } from "../../UI/ActionUI";

const MenuToggle_md = ({
  label,
  toggleMenu,
  isMenuOpen,
  menuItems,
  staticRoute,
}) => (
  <nav className=" flex flex-col justify-center items-center gap-2 max-w-48">
    <Button label={label} onClick={toggleMenu} className="py-2 rwd-text-lg" />
    {isMenuOpen && (
      <ul className="flex flex-col gap-2 w-full">
        {menuItems.map(({ path, label }) => (
          <NavItem
            key={path}
            label={label}
            className={`rwd-text-sm text-gray-600 active:bg-gray-500
              hover:bg-gray-400 hover:text-white hover:rounded-2xl 
               ${
                 staticRoute === path
                   ? "bg-gray-400 text-white rounded-2xl"
                   : ""
               } `}
            to={path}
          />
        ))}
      </ul>
    )}
  </nav>
);

const SideNav_md = ({ staticRoute }) => (
  <div className="flex flex-col h-full w-full gap-1">
    <CollapsibleSection
      label="我是買家"
      menuItems={MENU_CONFIG_MD.buyer}
      staticRoute={staticRoute}
      Component={MenuToggle_md}
    />
    <CollapsibleSection
      label="我是賣家"
      menuItems={MENU_CONFIG_MD.seller}
      staticRoute={staticRoute}
      Component={MenuToggle_md}
    />
    <CollapsibleSection
      label="會員資料"
      menuItems={MENU_CONFIG_MD.profile}
      staticRoute={staticRoute}
      Component={MenuToggle_md}
    />
  </div>
);
export default SideNav_md;
