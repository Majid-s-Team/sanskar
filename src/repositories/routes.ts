import { ApiRoute, RequestMethod } from "../types";

const requestMethods: { [key: string]: RequestMethod } = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};
Object.freeze(requestMethods);

export const user: ApiRoute = {
  url: "/user",
  method: requestMethods.GET,
  auth: true,
};

export const profile: ApiRoute = {
  url: "/profile",
  method: requestMethods.GET,
  auth: true,
};

export const updateUser: ApiRoute = {
  url: "/user",
  method: requestMethods.PATCH,
  auth: true,
};

export const loginUser: ApiRoute = {
  url: "/login",
  method: requestMethods.POST,
  auth: false,
};

export const forgotPassword: ApiRoute = {
  url: "/forgot-password",
  method: requestMethods.POST,
  auth: false,
};

export const verifyCode: ApiRoute = {
  url: "/verify-otp",
  method: requestMethods.POST,
  auth: false,
};

export const resetPassowrd: ApiRoute = {
  url: "/reset-password",
  method: requestMethods.POST,
  auth: false,
};

export const changePassword: ApiRoute = {
  url: "/user/change-password",
  method: requestMethods.POST,
  auth: true,
};

export const uploadfile: ApiRoute = {
  url: "/upload-media",
  method: requestMethods.POST,
  auth: true,
};

export const signUp: ApiRoute = {
  url: "/signup",
  method: requestMethods.POST,
  auth: false,
};

export const gurukal: ApiRoute = {
  url: "/gurukal",
  method: requestMethods.GET,
  auth: true,
};

export const teeshirtSize: ApiRoute = {
  url: "/teeshirt-size",
  method: requestMethods.GET,
  auth: true,
};

export const grade: ApiRoute = {
  url: "/grade",
  method: requestMethods.GET,
  auth: true,
};

export const activity: ApiRoute = {
  url: "/activity",
  method: requestMethods.GET,
  auth: true,
};

export const students: ApiRoute = {
  url: "/student",
  method: requestMethods.GET,
  auth: true,
};

export const payment: ApiRoute = {
  url: "/create-stripe-session",
  method: requestMethods.POST,
  auth: true,
};
