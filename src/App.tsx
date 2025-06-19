import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./app/Auth/Login";
import Otp from "./app/Auth/Otp";
import Resetpassword from "./app/Auth/ResetPassword";
import ForgotPassword from "./app/Auth/ForgotPassword";
import SignUp from "./app/Auth/SignUp";
import Step2 from "./app/Auth/Step2";
import Step3 from "./app/Auth/Step3";
import Home from "./app/Home";
import AttendanceManagement from "./app/AttendanceManagement";
import GurukulPrayers from "./app/GurukulPrayers";
const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/add-student" element={<Step2 />} />
        <Route path="/signup/address" element={<Step3 />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp/:email" element={<Otp />} />
        <Route
          path="/reset-password/:reset_password_token"
          element={<Resetpassword />}
        />

        {/* home routes */}
        <Route path="/home" element={<Home />} />
        <Route
          path="/attendance-management"
          element={<AttendanceManagement />}
        />
        <Route path="/gurukul-prayer" element={<GurukulPrayers />} />
      </Routes>
    </>
  );
};

export default App;
