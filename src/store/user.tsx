import { createContext, Dispatch } from "react";
import {
  UserActions,
  UserActionTypes,
  UserContextType,
} from "../types/contexts/user";

export const userReducer = (state: UserContextType, action: UserActions) => {
  switch (action.type) {
    case UserActionTypes.POST:
      return action.payload;
    case UserActionTypes.PUT:
      return { ...state, ...action.payload };
    case UserActionTypes.DELETE:
      return null;
    default:
      return state;
  }
};

export const UserContext = createContext<
  [UserContextType | null, Dispatch<UserActions>]
>([null, () => {}]);
