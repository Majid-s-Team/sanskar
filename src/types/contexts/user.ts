import { UserResponse } from "../api/user";

export enum UserActionTypes {
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type UserContextType = UserResponse | null;

type POST = {
  type: UserActionTypes.POST;
  payload: UserResponse;
};

type DELETE = {
  type: UserActionTypes.DELETE;
};

type PUT = {
  type: UserActionTypes.PUT;
  payload: Partial<UserResponse>;
};

export type UserActions = POST | DELETE | PUT;
