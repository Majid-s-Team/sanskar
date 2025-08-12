import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const usePreviousPath = () => {
  const location = useLocation();
  const [prevPath, setPrevPath] = useState<string | null>(null);

  useEffect(() => {
    const lastPath = sessionStorage.getItem("lastPath"); // get stored previous
    setPrevPath(lastPath); // set as previous

    // store current for next navigation
    sessionStorage.setItem("lastPath", location.pathname);
  }, [location.pathname]);

  return prevPath;
};
