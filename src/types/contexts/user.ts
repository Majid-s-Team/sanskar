import { UserType } from "../api/user";

export enum UserActionTypes {
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type UserContextType = UserType | null;

type POST = {
  type: UserActionTypes.POST;
  payload: UserType;
};

type DELETE = {
  type: UserActionTypes.DELETE;
};

type PUT = {
  type: UserActionTypes.PUT;
  payload: Partial<UserType>;
};

export type UserActions = POST | DELETE | PUT;