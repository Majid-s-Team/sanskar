import React, { JSX, useEffect, useReducer } from "react";
import { UserContext, userReducer } from "../../store/user";
import { UserActionTypes } from "../../types/contexts";
import { getStorageData, setStorageData } from "../../helper";

/**
 * Provides the user state to the application.
 *
 * Uses the `UserContext` to expose the user state to the application.
 *
 * Automatically persists the user state to local storage.
 *
 * @returns {JSX.Element} The user state provider element.
 */
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): JSX.Element => {
  const [state, dispatch] = useReducer(userReducer, null);

  useEffect(() => {
    const storedUser = getStorageData("user");
    if (storedUser) {
      dispatch({
        type: UserActionTypes.POST,
        payload: storedUser,
      });
    }
  }, []);

  useEffect(() => {
    if (state) {
      setStorageData("user", state);
    }
  }, [state]);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
