import {SetUserProfileType} from '../profile/profileActions';
import {setErrorAC, SetErrorActionType} from '../Error/errorReducer';

export const LOGIN_LOADING = 'LOGIN/LOADING';
export const LOGIN_ERROR = 'LOGIN/ERROR';
export const LOGIN_SUCCESS = 'LOGIN/SUCCESS';
export const LOGOUT_SUCCESS = 'LOGIN/LOGOUT_SUCCESS';

export const loginSuccess = (): LoginSuccessType => ({
    type: LOGIN_SUCCESS,
});
export const loginError = (
    error: string,
    isLoggedIn: boolean
): LoginErrorType => ({
    type: LOGIN_ERROR,
    error,
    isLoggedIn,
});

export const logoutSuccess = (isLoggedIn: boolean):LogoutSuccessType => ({
    type: LOGOUT_SUCCESS,
    isLoggedIn,
    // logoutSuccessMessage,
});

//types
type LoginSuccessType = {
    type: typeof LOGIN_SUCCESS;
};
type LoginErrorType = {
    type: typeof LOGIN_ERROR;
    error: string;
    isLoggedIn: boolean;
};
type LogoutSuccessType = {
    type: typeof LOGOUT_SUCCESS;
    // logoutSuccessMessage: string;
    isLoggedIn: boolean;
};

export type LoginActions =
    | LoginSuccessType
    | SetUserProfileType
    | LoginErrorType
    | SetErrorActionType
    | LogoutSuccessType

