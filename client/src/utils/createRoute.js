import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../components/Common/ProtectedRoute";

export const createRoute = (
  { path, requiresSlug, Component, isProtected = false, slugKey = "id" },
  userHasAccess
) => {
  console.log(`using createRoute`);
  const dynamicPath = requiresSlug ? `${path}/:${slugKey}` : path;

  if (isProtected) {
    return (
      <Route
        key={dynamicPath}
        path={dynamicPath}
        element={
          <ProtectedRoute isAllowed={userHasAccess}>
            <Component />
          </ProtectedRoute>
        }
      />
    );
  }

  return <Route key={dynamicPath} path={dynamicPath} element={<Component />} />;
};
