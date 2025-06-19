import { useState } from "react";
import {
  forgotPassword,
  loginUser,
  request,
  resetPassowrd,
  verifyCode,
} from "../repositories";
import { useNavigate, useParams } from "react-router-dom";
import { setStorageData } from "../helper";
import { ResponseError, UserType } from "../types";
import { notification } from "antd";
import { useUser } from "./useUser";
import { UserActionTypes } from "../types/contexts";
export const useAuth = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const [loading, setLoading] = useState(false);
  const [user, dispatch] = useUser();

  const handleFailure = (response: ResponseError) => {
    setLoading(false);
    if (!response) return;
    response.message.forEach((message: string) => {
      notification.error({
        message: response.error,
        description: message,
      });
    });
    console.log("error", response);
  };

  const login = (valus: { email: string; password: string }) => {
    setLoading(true);
    request(loginUser.url, loginUser.method)
      .setBody({
        ...valus,
        device: "web",
        device_token: "1234567890",
      })
      .onSuccess((res, headers) => {
        dispatch({
          type: UserActionTypes.POST,
          payload: res?.data as UserType,
        });
        setStorageData("access_token", headers["access_token"]);
        setStorageData("user", res?.data);
        navigate("/dashboard");
        setLoading(false);
      })
      .onFailure(handleFailure)
      .call();
  };

  const forgotpassword = (value: { email: string }) => {
    setLoading(true);
    request(forgotPassword.url, forgotPassword.method)
      .setBody({ ...value, mode: "email", identifier: value["email"] })
      .onSuccess((res) => {
        console.log(res);
        setLoading(false);
        navigate(`/otp/${btoa(value["email"])}`);
      })
      .onFailure(handleFailure)
      .call();
  };

  const otp = (value: { code: string }) => {
    setLoading(true);

    request(verifyCode.url, verifyCode.method)
      .setBody({
        ...value,
        mode: "email",
        email: atob(email as string),
      })
      .onSuccess((res, headers) => {
        console.log(res);
        navigate("/reset-password/" + headers["reset_password_token"]);
        setLoading(false);
      })
      .onFailure(handleFailure)
      .call();
  };

  const resetpassowrd = (
    value: { password: string },
    reset_password_token: string
  ) => {
    setLoading(true);
    request(resetPassowrd.url, resetPassowrd.method)
      .setHeaders({
        reset_password_token,
      })
      .setBody({
        ...value,
      })
      .onSuccess(() => {
        navigate("/login");
        setLoading(false);
      })
      .onFailure(handleFailure)
      .call();
  };

  const logout = () => {
    // navigate("/login");
    window.location.href = "/login";
    localStorage.clear();
    console.log("logout");
  };

  return {
    user,
    dispatch,
    loading,
    login,
    forgotpassword,
    otp,
    resetpassowrd,
    logout,
  };
};
