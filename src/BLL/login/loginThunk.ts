import {Dispatch} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {setUserProfile} from '../profile/profileActions';
import {IAppStore} from '../store/store';
import {LoginActions, loginError, loginSuccess} from './loginActions';
import {setAppLoading, setErrorAC, setInitializedAC} from '../app/app-reducer';
import {authApi, LoginDataType} from '../../DAL/auth-api';

type Return = void;
type ExtraArgument = {};
type IGetStore = () => IAppStore;



export const signIn = (payload: LoginDataType) => (dispatch: Dispatch) => {
            dispatch(setAppLoading(true))
            authApi
                .login(payload)
                .then((res) => {
                    dispatch(loginSuccess());
                    dispatch(setUserProfile(res.data));
                    dispatch(loginError('', true));
                })
                .catch((err) => {
                    const error = err.response
                        ? err.response.data.error
                        : err.message + ', more details in the console';
                    console.log('Error: ', {...err});
                    dispatch(loginError(error, false));
                    dispatch(setErrorAC(error))
                })
                .finally(() => dispatch(setAppLoading(false)))
        };


export const checkAuthMe = () => (dispatch: Dispatch) => {
    dispatch(setAppLoading(true))
    authApi.me()
        .then((res) => {
            dispatch(setAppLoading(false))
            dispatch(setInitializedAC(true));
            dispatch(setUserProfile(res.data))
        })
        .catch((err) => {
            dispatch(setAppLoading(false))
        })
}


export const logOut = () => (dispatch: Dispatch) => {
        dispatch(setAppLoading(true))
        authApi
            .logOut()
            .then((res) => {
                dispatch(setAppLoading(false))
                dispatch(setUserProfile({
                    _id: '',
                    email: '',
                    name: '',
                    avatar: '',
                    publicCardPacksCount: 0,
                    created: '',
                    updated: '',
                    isAdmin: false,
                    verified: false,
                    rememberMe: false,
                    error: '',
                    token: '',
                    tokenDeathTime: 0,
                    __v: 0
                }));
            })
            .catch((err) => {
                dispatch(setAppLoading(false))
                const error = err.response
                    ? err.response.data.error
                    : err.message + ', more details in the console';
                console.log('Error: ', {...err});
                dispatch(loginError(error, false));
                dispatch(setErrorAC(error))
            });
    };




