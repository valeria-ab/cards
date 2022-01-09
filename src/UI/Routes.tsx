import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Error404 } from "./Error404";
import ForgotPage from "./Forgot/ForgotPage";
import { ProfilePage } from "./Profile/ProfilePage";
import RegisterPage from "./Register/RegisterPage";
import SignInPage from "./SignIn/SignInPage";

// all project paths
export const SIGN_IN_PATH = "/sign-in";
export const REGISTER_PATH = "/register";
export const FORGOT_PATH = "/forgot";
export const PROFILE_PATH = "/profile";

const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Navigate to={SIGN_IN_PATH} />} />
      <Route path={PROFILE_PATH} element={<ProfilePage />} />
      <Route path={SIGN_IN_PATH} element={<SignInPage />} />
      <Route path={REGISTER_PATH} element={<RegisterPage />} />
      <Route path={FORGOT_PATH} element={<ForgotPage />} />
      <Route path={"404"} element={<Error404 />} />
      <Route path={"*"} element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default RoutesComponent;
