import React from "react";
import { ListItem, NavItem } from "../../UI/BaseUI";
import { MENU_CONFIG_SM } from "../../../utils/constants";
import { CollapsibleSection } from "../../UI/ActionUI";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const MenuToggle_sm = ({ toggleMenu, isMenuOpen, menuItems }) => (
  <nav className="flex flex-col justify-center items-center gap-2">
    <ListItem icon={faBars} onClick={toggleMenu} className="py-2" />
    {isMenuOpen && (
      <ul className="absolute top-full left-0 flex flex-col min-w-full z-10 shadow-lg bg-gray-500">
        {menuItems.map(({ path, label }) => (
          <NavItem
            key={path}
            label={label}
            className="text-base text-white p-2 my-1
              hover:bg-gray-400 hover:text-white active:bg-gray-500"
            to={path}
          />
        ))}
      </ul>
    )}
  </nav>
);

const SideNav_sm = ({ staticRoute }) => (
  <div className="relative">
    <CollapsibleSection
      menuItems={MENU_CONFIG_SM}
      staticRoute={staticRoute}
      isAutoOpen={false}
      Component={MenuToggle_sm}
    />
  </div>
);
export default SideNav_sm;
