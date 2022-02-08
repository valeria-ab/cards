import {Dispatch} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {api, LoginDataType} from "../../DAL/api";
import { setErrorAC } from "../Error/errorReducer";
import {setUserProfile} from "../profile/profileActions";
import {IAppStore} from "../store/store";
import {LoginActions, loginError, loginSuccess, logoutSuccess} from './loginActions';

type Return = void;
type ExtraArgument = {};
type IGetStore = () => IAppStore;

export const signIn =
    (
        payload: LoginDataType
    ): ThunkAction<Return, IAppStore, ExtraArgument, LoginActions> =>
        (
            dispatch: ThunkDispatch<IAppStore, ExtraArgument, LoginActions>,
            getStore: IGetStore
        ) => {
            api
                .login(payload)
                .then((res) => {
                    dispatch(loginSuccess());
                    dispatch(setUserProfile(res.data));
                    dispatch(loginError("", true));
                })
                .catch((err) => {
                    const error = err.response
                        ? err.response.data.error
                        : err.message + ", more details in the console";
                    console.log("Error: ", {...err});
                    dispatch(loginError(error, false));
                    dispatch(setErrorAC(error))
                });
        };


export const checkAuthMe = () => (dispatch: Dispatch) => {
    api.me()
        .then((res)=> {
            dispatch( loginSuccess() );
            dispatch(setUserProfile(res.data))
        })
        .catch((err)=> {
            dispatch(setErrorAC(err))
        })
}


export const logOut = (): ThunkAction<Return, IAppStore, ExtraArgument, LoginActions> =>
        (
            dispatch: ThunkDispatch<IAppStore, ExtraArgument, LoginActions>,
            getStore: IGetStore
        ) => {
            api
                .logOut()
                .then((res ) => {
                   dispatch(logoutSuccess(false))

                 dispatch(setUserProfile({
                     _id: "",
                     email: "",
                     name: "",
                     avatar: "",
                     publicCardPacksCount: 0,
                     created: "",
                     updated: "",
                     isAdmin: false,
                     verified: false,
                     rememberMe: false,
                     error: "",
                     token: "",
                     tokenDeathTime: 0,
                     __v: 0
                 }));
                })
                .catch((err) => {
                    const error = err.response
                        ? err.response.data.error
                        : err.message + ", more details in the console";
                    console.log("Error: ", {...err});
                    dispatch(loginError(error, false));
                    dispatch(setErrorAC(error))
                });
        };




