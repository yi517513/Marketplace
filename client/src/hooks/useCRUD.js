import useAsyncAction from "./Common/useAsyncAction";
import { useCallback } from "react";

const useCRUD = () => {
  const { asyncAction } = useAsyncAction();

  const getData = useCallback(
    (fetchFunction, fectchDataId, callback) => {
      asyncAction(
        fetchFunction,
        fectchDataId,
        {},
        (data) => {
          callback(true, data);
          console.log("getData success");
        },
        (error) => {
          console.log(error);
          callback(false);
        }
      );
    },
    [asyncAction]
  );

  const deleteData = useCallback(
    (deleteFunction, deleteVariable, callback) => {
      asyncAction(
        deleteFunction,
        deleteVariable,
        "正在刪除..",
        (data) => callback(true),
        (error) => callback(false)
      );
    },
    [asyncAction]
  );

  const updateData = useCallback(
    async (updateFunction, updateVariables, callback) => {
      asyncAction(
        updateFunction,
        updateVariables,
        "正在更新..",
        (data) => {
          callback(true, data?.updateDataId);
        },
        (error) => {
          console.log(error);
          callback(false);
        }
      );
    },
    [asyncAction]
  );

  const createData = useCallback(
    async (createFunction, createVariables, callback) => {
      asyncAction(
        createFunction,
        createVariables,
        "正在上傳..",
        (data) => {
          callback(true, data.newData);
        },
        (error) => {
          callback(false);
        }
      );
    },
    [asyncAction]
  );

  return {
    getData,
    deleteData,
    updateData,
    createData,
  };
};

export default useCRUD;
