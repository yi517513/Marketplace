import useStaticRoute from "./useStaticRoute";

const useCheckRoute = (target) => {
  const staticRoute = useStaticRoute();

  const isTarget = target.some((route) => staticRoute.includes(route));

  return isTarget;
};

export default useCheckRoute;
