import { useEffect, useState } from "react";
import { requestPermission } from "./notifications";

const STORAGE_KEY = "fcm_token";

export const useFcmToken = () => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEY),
  );

  useEffect(() => {
    if (token) return;

    requestPermission().then((t) => {
      if (!t) return;
      localStorage.setItem(STORAGE_KEY, t);
      setToken(t);
    });
  }, [token]);

  return token;
};
