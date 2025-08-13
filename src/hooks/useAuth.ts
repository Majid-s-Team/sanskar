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
  const { email } = useParams<{ email: string }>();
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

  const login = (
    valus: { login: string; password: string },
    role: "parent" | "teacher"
  ) => {
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
          payload: (res?.data as { user: UserType })?.user,
        });
        setStorageData("access_token", headers["access_token"]);
        setStorageData("user", res?.data);
        navigate("/home");
        setStorageData("role", role);
        setLoading(false);
      })
      .onFailure((res: any) => {
        setLoading(false);
        notification.error({
          message: "Error",
          description: res.message,
        });
        if (
          res?.message ===
          "Payment not completed. Please complete your payment to proceed."
        ) {
          navigate("/payment/" + res?.data?.id);
        }
      })
      .call();
  };

  const forgotpassword = (value: { primary_email: string }) => {
    setLoading(true);
    request(forgotPassword.url, forgotPassword.method)
      .setBody({ ...value })
      .onSuccess((res: any) => {
        setLoading(false);
        navigate(`/otp/${btoa(value["primary_email"])}`);
        notification.success({
          message: "OTP",
          description: res?.data?.otp,
        });
      })
      .onFailure((res) => {
        notification.error({
          message: "Error",
          description: res.message,
        });
        setLoading(false);
      })
      .call();
  };

  const otp = (value: { otp: string }) => {
    setLoading(true);
    const decodedEmail = email ? atob(email) : "";
    request(verifyCode.url, verifyCode.method)
      .setBody({
        ...value,
        primary_email: decodedEmail,
      })
      .onSuccess((res) => {
        console.log(res);
        navigate(`/reset-password/${btoa(decodedEmail)}`);
        setLoading(false);
      })
      .onFailure(handleFailure)
      .call();
  };

  const resetpassowrd = (value: { password: string }, email: string) => {
    setLoading(true);
    request(resetPassowrd.url, resetPassowrd.method)
      // .setHeaders({
      //   reset_password_token,
      // })
      .setBody({
        ...value,
        primary_email: atob(email),
      })
      .onSuccess(() => {
        navigate("/login");
        setLoading(false);
        notification.success({
          message: "Success",
          description: "Password has been reset successfully.",
        });
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
