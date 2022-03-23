import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Login from './initialization components/Login/Login';
import {NewPassword} from './initialization components/Forgot/NewPassword';
import {Error404} from './common/Error404/Error404';
import {PacksList} from './PacksList/PacksList';
import {Learning} from './Modals/Learning/Learning';
import {ProfilePage} from './Profile/ProfilePage';
import {CardsPage} from './common/Cards/CardsPage';
import RegisterContainer from './initialization components/Register/RegisterContainer';
import ForgotPasswordContainer from './initialization components/Forgot/ForgotContainer';

// project paths
export const SIGN_IN_PATH = '/login';
export const REGISTER_PATH = '/register';
export const FORGOT_PATH = '/forgot';
export const PROFILE_PATH = '/profile';
export const PACKS_LIST_PATH = '/packs-list';
export const RECOVERY_PATH = '/set-new-password/:token';

const RoutesComponent: React.FC = () => {


    return (
        <Routes>
            <Route path={'/'} element={<ProfilePage/>}/>
            <Route path={PROFILE_PATH} element={<ProfilePage/>}/>
            <Route path={SIGN_IN_PATH} element={<Login/>}/>
            <Route path={REGISTER_PATH} element={<RegisterContainer/>}/>
            <Route path={FORGOT_PATH} element={<ForgotPasswordContainer/>}/>
            <Route path={RECOVERY_PATH} element={<NewPassword/>}/>
            <Route path={PACKS_LIST_PATH} element={<PacksList/>}/>
            <Route path={'404'} element={<Error404/>}/>
            <Route path={'*'} element={<Navigate to="/404"/>}/>
            <Route path={'/cards'} element={<Navigate to="/profile"/>}/>
            <Route path={'/learn/:packId/:packName'} element={<Learning/>}/>
            <Route path={'pack/:packId/:packName'} element={<CardsPage/>}/>
        </Routes>
    );
};

export default RoutesComponent;
