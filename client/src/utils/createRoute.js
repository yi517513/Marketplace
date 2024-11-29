import React from "react";
import { Route } from "react-router-dom";

export const createRoute = ({ path, requiresSlug, Page, slug }) => {
  const route = requiresSlug ? `${path}/:${slug}` : path;

  return <Route key={route} path={route} element={<Page />} />;
};
