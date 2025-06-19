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

export const updateUser: ApiRoute = {
  url: "/user",
  method: requestMethods.PATCH,
  auth: true,
};

export const loginUser: ApiRoute = {
  url: "/user/login",
  method: requestMethods.POST,
  auth: false,
};

export const forgotPassword: ApiRoute = {
  url: "/user/forgot-password",
  method: requestMethods.POST,
  auth: false,
};

export const verifyCode: ApiRoute = {
  url: "/user/verify-code",
  method: requestMethods.POST,
  auth: false,
};

export const resetPassowrd: ApiRoute = {
  url: "/user/set-password",
  method: requestMethods.POST,
  auth: false,
};

export const changePassword: ApiRoute = {
  url: "/user/change-password",
  method: requestMethods.POST,
  auth: true,
};

export const uploadfile: ApiRoute = {
  url: "/general/file-upload",
  method: requestMethods.POST,
  auth: true,
};

export const advertisements: ApiRoute = {
  url: "/advertisement",
  method: requestMethods.GET,
  auth: true,
};

export const bookingRequest: ApiRoute = {
  url: "/booking-request",
  method: requestMethods.GET,
  auth: true,
};

export const categories: ApiRoute = {
  url: "/category",
  method: requestMethods.GET,
  auth: true,
};

export const categoriesPost: ApiRoute = {
  url: "/category",
  method: requestMethods.POST,
  auth: true,
};

export const categoriesUpdate: ApiRoute = {
  url: "/category",
  method: requestMethods.PATCH,
  auth: true,
};

export const categoriesDelete: ApiRoute = {
  url: "/category",
  method: requestMethods.DELETE,
  auth: true,
};

export const faqsGet: ApiRoute = {
  url: "/faq",
  method: requestMethods.GET,
  auth: true,
};

export const faqsPost: ApiRoute = {
  url: "/faq",
  method: requestMethods.POST,
  auth: true,
};

export const faqsDelete: ApiRoute = {
  url: "/faq",
  method: requestMethods.DELETE,
  auth: true,
};

export const faqsUpdate: ApiRoute = {
  url: "/faq",
  method: requestMethods.PATCH,
  auth: true,
};

export const boostingRequest: ApiRoute = {
  url: "/boosting-package",
  method: requestMethods.GET,
  auth: true,
};

export const queries: ApiRoute = {
  url: "/help-query",
  method: requestMethods.GET,
  auth: true,
};

export const boostingPackage: ApiRoute = {
  url: "/boosting-package",
  method: requestMethods.GET,
  auth: true,
};

export const createBoostingPackage: ApiRoute = {
  url: "/boosting-package",
  method: requestMethods.POST,
  auth: true,
};

export const updateBoostingPackage: ApiRoute = {
  url: "/boosting-package",
  method: requestMethods.PATCH,
  auth: true,
};

export const deleteBoostingPackage: ApiRoute = {
  url: "/boosting-package",
  method: requestMethods.DELETE,
  auth: true,
};

export const dashboard: ApiRoute = {
  url: "/home/admin",
  method: requestMethods.GET,
  auth: true,
};
