import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProfilePage } from "./Profile/ProfilePage";
import RegisterPage from "./Register/RegisterPage";
import Login from "./Login/Login";
import { NewPassword } from "./Forgot/NewPassword";
import { Error404 } from "./Error404";
import { Forgot } from "./Forgot/Forgot";

// all project paths
export const SIGN_IN_PATH = "/login";
export const REGISTER_PATH = "/register";
export const FORGOT_PATH = "/forgot";
export const PROFILE_PATH = "/profile";
export const RECOVERY_PATH = "/set-new-password/:token";

const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<ProfilePage />} />
      <Route path={PROFILE_PATH} element={<ProfilePage />} />
      {/*<Route path={SIGN_IN_PATH} element={<Login />} />*/}
      <Route path={REGISTER_PATH} element={<RegisterPage />} />
      <Route path={FORGOT_PATH} element={<Forgot />} />
      <Route path={RECOVERY_PATH} element={<NewPassword />} />
      <Route path={"404"} element={<Error404 />} />
      <Route path={"*"} element={<Navigate to="/404" />} />
      <Route path={"/cards"} element={<Navigate to="/profile" />} />
    </Routes>
  );
};

export default RoutesComponent;
