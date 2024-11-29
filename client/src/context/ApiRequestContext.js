import React, { createContext, useContext, useCallback } from "react";
import { asyncRequest } from "../utils/api/apiRequest";
import { useDispatch } from "react-redux";
import {
  setErrorNotify,
  setLoadingNotify,
  setSuccessNotify,
} from "../redux/slices/commonSlice";

// 業務依賴組件
import apiServicesMap from "../services/apiServicesMap";
import { useApiCallback } from "./ApiCallbackContext";
import { API_REQ_LOADING_MSG } from "../utils/message";

const ApiRequestContext = createContext();

export const CreateApiProvider = ({ children }) => {
  const dispatch = useDispatch();
  const getApiCallback = useApiCallback();

  /**
   * 生成 API 請求處理器
   * @description
   * 負責生成一個用於 API 請求的函數
   * 1. 接收 action 作為請求的行為標識符
   * 2. 根據 action 獲取對應的 optimistic、successCb、errorCb 回調函數
   * 3. 根據 action 調取對應的 Axios 服務
   * 4. 發送請求並在不同階段執行相應的回調與發送通知
   *
   * @param {string} action - 請求的行為標識符
   * @returns {function} API 處理函數
   */

  const createApiHandler = useCallback((action) => {
    console.log(`action: ${action}`);

    if (!action) return;
    const actionService = apiServicesMap(action);
    const { optimistic, successCb, errorCb } = getApiCallback(action);
    return async (payload) => {
      console.log(payload);
      try {
        // 發送加載通知
        dispatch(setLoadingNotify(API_REQ_LOADING_MSG[action]));
        // 執行 optimistic
        optimistic(payload);

        // 發送API請求
        const response = await asyncRequest(actionService, payload);
        const { data, message } = response;
        console.log(response);
        // 發送成功通知
        dispatch(setSuccessNotify(message));
        // 請求成功處理
        successCb({ data, message });
      } catch (error) {
        const errorMessage = error.response?.data.message;

        // 發送錯誤通知
        dispatch(setErrorNotify(errorMessage));
        // 請求錯誤處理
        errorCb(errorMessage);
      }
    };
  }, []);

  return (
    <ApiRequestContext.Provider value={createApiHandler}>
      {children}
    </ApiRequestContext.Provider>
  );
};

export const useApiRequest = () => useContext(ApiRequestContext);
