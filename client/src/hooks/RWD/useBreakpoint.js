import { useCallback, useEffect, useState } from "react";

const breakpoints = {
  xl: 1280,
  lg: 1024,
  md: 768,
  sm: 640,
};

const useBreakpoint = () => {
  const [windowSize, setWindowSize] = useState(() => {
    return Object.keys(breakpoints).find(
      (key) => window.innerWidth >= breakpoints[key]
    );
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize(() => {
        return Object.keys(breakpoints).find(
          (key) => window.innerWidth >= breakpoints[key]
        );
      });

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 斷點判斷
  const breakpoint = useCallback(
    (breakpoint) =>
      breakpoint !== undefined &&
      breakpoints[windowSize] >= breakpoints[breakpoint],
    [windowSize]
  );

  return { breakpoint, windowSize };
};

export default useBreakpoint;
