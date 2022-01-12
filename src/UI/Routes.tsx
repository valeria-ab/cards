import React, {MemoExoticComponent} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import ForgotPage from "./Forgot/ForgotPage";
import {ProfilePage} from "./Profile/ProfilePage";
import RegisterPage from "./Register/RegisterPage";
import SignInPage from "./SignIn/SignInPage";
import {NewPassword} from "./Forgot/NewPassword";
import {Error404} from "./Error404";

// all project paths
export const SIGN_IN_PATH = "/sign-in";
export const REGISTER_PATH = "/register";
export const FORGOT_PATH = "/forgot";
export const PROFILE_PATH = "/profile";
export const RECOVERY_PATH = "/set-new-password/:token";

const RoutesComponent: React.FC = () => {
    return (
        <Routes>
            {/* <Route path={"/"} element={<Navigate to={SIGN_IN_PATH} />} />*/}
            <Route path={'/'} element={<SignInPage/>}/>
            <Route path={PROFILE_PATH} element={<ProfilePage/>}/>
            <Route path={REGISTER_PATH} element={<RegisterPage/>}/>
            <Route path={FORGOT_PATH} element={<ForgotPage/>}/>
            <Route path={RECOVERY_PATH} element={<NewPassword/>}/>
            <Route path={"404"} element={<Error404 />} />
            <Route path={"*"} element={<Navigate to="/404" />} />
        </Routes>
    );
};

export default RoutesComponent;
