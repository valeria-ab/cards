import {SetUserProfileType} from '../profile/profileActions';
import {SetErrorActionType} from '../app/app-reducer';

export const LOGIN_LOADING = 'LOGIN/LOADING';
export const LOGIN_ERROR = 'LOGIN/ERROR';
export const LOGIN_SUCCESS = 'LOGIN/SUCCESS';
export const LOGOUT_SUCCESS = 'LOGIN/LOGOUT_SUCCESS';

// export const loginSuccess = (): LoginSuccessType => ({
//     type: LOGIN_SUCCESS,
// });
export const loginError = (
    error: string
): LoginErrorType => ({
    type: LOGIN_ERROR,
    error
});


//types
// type LoginSuccessType = {
//     type: typeof LOGIN_SUCCESS;
// };
type LoginErrorType = {
    type: typeof LOGIN_ERROR;
    error: string;
};


export type LoginActions =
    // | LoginSuccessType
    | SetUserProfileType
    | LoginErrorType
    | SetErrorActionType


