import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Button, ListItem, Input, NavItem, TextArea } from "./BaseUI";
import useUiReduxHandler from "../../hooks/handler/useUiReduxHandler";
import { useApiRequest } from "../../context/ApiRequestContext";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import useNavigation from "../../hooks/Common/useNavigation";
import useBreakpoint from "../../hooks/RWD/useBreakpoint";

// 導航按鈕
export const NavigateButton = ({ path, slug, ...props }) => {
  const navigateTo = useNavigation();

  return <Button onClick={() => navigateTo({ path, slug })} {...props} />;
};

// 導航區塊
export const NavigateDiv = ({ path, slug, children, ...props }) => {
  const to = `${path}/${slug}`;

  return (
    <NavItem to={to} {...props}>
      {children}
    </NavItem>
  );
};

// 登出
export const LogoutNav = ({ method, ...props }) => {
  const createApiHandler = useApiRequest();
  const logout = useMemo(() => createApiHandler(`logout`), []);

  return <ListItem onClick={() => logout()} {...props} />;
};

// UI操作
export const ActionButton = React.memo(
  ({ action, payload, storePath, ...props }) => {
    const handler = useUiReduxHandler({ action, storePath });

    return <Button onClick={() => handler(payload)} {...props} />;
  }
);

// API操作
export const SubmitButton = React.memo(({ method, payload, ...props }) => {
  const createApiHandler = useApiRequest();
  const handler = useMemo(() => createApiHandler(method), [method]);

  return <Button onClick={() => handler(payload)} {...props} />;
});

// 檔案上傳，當前為image
export const FileInput = React.memo(({ method, ...props }) => {
  const createApiHandler = useApiRequest();
  const handler = useMemo(() => createApiHandler(method), [method]);

  return (
    <Input
      onChange={(e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        handler(formData);
      }}
      {...props}
    />
  );
});

// 互斥按鈕
export const SwitchButton = ({ label, role, setRole, className }) => (
  <div className={className}>
    <Button
      label={label[0]}
      disabled={role}
      onClick={() => setRole((prev) => !prev)}
      className="p-1 "
    />
    <Button
      label={label[1]}
      disabled={!role}
      onClick={() => setRole((prev) => !prev)}
      className="p-1 "
    />
  </div>
);

// 用戶認證彈窗
export const UserAccessModal = ({ isAuthenticated }) => {
  const [fadeOut, setFadeOut] = useState(false);

  const navigateTo = useNavigation();

  const handleNavigateAndFadeOut = () => {
    setFadeOut(true);
    setTimeout(() => navigateTo({ path: "HOME" }), 780);
  };

  return (
    <div className={`w-full ${fadeOut ? "animate-fade-out" : ""}`}>
      <Modal isOpen={!isAuthenticated} modalType="Auth">
        <div className="flex h-3/5">
          <Button
            label="首頁"
            path="HOME"
            onClick={handleNavigateAndFadeOut}
            className="w-16 h-full"
          />
        </div>
      </Modal>
    </div>
  );
};

// 根據 路由或者點擊 來決定選單是否開啟
export const CollapsibleSection = ({
  label,
  menuItems,
  staticRoute,
  isAutoOpen = true,
  Component,
}) => {
  const isActiveMenu = menuItems.some((item) => item.path === staticRoute);
  const [isMenuOpen, setIsMenuOpen] = useState(isActiveMenu && isAutoOpen);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <Component
      label={label}
      toggleMenu={toggleMenu}
      isMenuOpen={isMenuOpen}
      menuItems={menuItems}
      staticRoute={staticRoute}
    />
  );
};

export const ProductPaymentPanel = ({ ownerId, productInfo, className }) => {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.auth.userId);
  // const isOwner = userId === ownerId;
  const isOwner = false;

  return (
    <div className={`flex w-full justify-center ${className}`}>
      <div className="flex flex-col text-xl gap-2 w-full h-full p-2">
        <div className="flex flex-col items-center w-full h-full">
          {isOwner ? (
            <p className="text-lg text-center text-dark-gray ">
              您正在瀏覽自己的商品
            </p>
          ) : (
            <div className="w-full flex justify-between items-center">
              <NumberStepper
                buttonLabel={["-", "+"]}
                limit={[1, productInfo.inventory]}
                state={amount}
                setState={setAmount}
                onError={setError}
                placeholder={amount}
              />
              <SubmitButton
                method="createOrder"
                payload={{ ...productInfo, amount: 1 }}
                label="立即購買"
                className="h-12"
              />
            </div>
          )}
        </div>
        <div className="text-red-600 text-start items-center ml-2">{error}</div>
      </div>
    </div>
  );
};

// Input的value與父組件的state綁定
export const NumberStepper = ({
  buttonLabel,
  inputLabel,
  inputClass,
  buttonClass,
  showPageDisplay,
  value,
  setValue,
  limit,
  onError,
}) => {
  const { breakpoint, windowSize } = useBreakpoint();

  const handleSetState = (newValue) => {
    onError(null);
    setValue(Number(newValue));
  };

  return (
    <div className="flex items-center gap-2">
      {breakpoint("md") && (
        <div className="flex items-center justify-center md:basis-2/6">
          <Button
            label={buttonLabel[0]}
            onClick={() => handleSetState(value - 1)}
            className={buttonClass}
            disabled={value <= limit[0]}
          />
        </div>
      )}

      <div className="flex h-full items-center justify-center md:basis-2/6">
        <div className="flex basis-4/5 md:basis-3/5">
          <InputWithValidation
            label={breakpoint("md") ? "" : inputLabel}
            className={"h-full"}
            value={value}
            limit={limit}
            onValidInput={(value) => setValue(value)}
            onError={(msg) => onError(msg)}
          />
        </div>
        {showPageDisplay && (
          <span className="flex md:basis-2/5 justify-center">
            {showPageDisplay}
          </span>
        )}
      </div>
      {breakpoint("md") && (
        <div className="flex items-center justify-center md:basis-2/6">
          <Button
            label={buttonLabel[1]}
            onClick={() => handleSetState(value + 1)}
            className={buttonClass}
            disabled={value >= limit[1]}
          />
        </div>
      )}
    </div>
  );
};

export const InputWithValidation = ({
  label,
  className,
  value,
  limit,
  onValidInput,
  onError,
}) => {
  const [tempState, setTempState] = useState(value);

  const validate = (value) => {
    if (value === "" || value === 0) {
      onError(null);
      return true;
    }

    if (isNaN(Number(value))) {
      onError("請輸入有效數字");
      return false;
    }

    const numericValue = Number(value);
    if (numericValue < limit[0] || numericValue > limit[1]) {
      onError(`數字必須在 ${limit[0]} 與 ${limit[1]} 之間`);
      return false;
    }
    onError(null);
    return true;
  };

  useEffect(() => {
    if (tempState === "") {
      onError(null);
    } else if (validate(tempState)) {
      onValidInput(Number(tempState));
    }
  }, [tempState]);

  useEffect(() => {
    setTempState(value);
  }, [value]);

  return (
    <Input
      label={label}
      className={className}
      value={tempState}
      onChange={(e) => setTempState(e.target.value)}
    />
  );
};
