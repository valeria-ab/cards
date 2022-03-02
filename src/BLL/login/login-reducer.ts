
import {setUserProfile, SetUserProfileType} from '../profile/profileActions';
import {setAppLoading, setErrorAC, SetErrorActionType, setInitializedAC} from '../app/app-reducer';
import {authApi, LoginDataType} from '../../DAL/auth-api';
import {Dispatch} from 'redux';
import {setCardPacksPageCountAC, setCardsPacksCountFromRangeAC} from '../packs/packs-reducer';
import {setCardsPageCountAC} from '../cards/cards-reducer';


export type LoginState = {
    error: string
};

export const loginInitialState: LoginState = {
    error: ""
};

export const loginReducer = (
    state: LoginState = loginInitialState,
    action: LoginActions
) => {
    switch (action.type) {
        case 'LOGIN/ERROR': {
            return {...state, error: action.error};
        }
        default: {
            return state;
        }
    }
};

export const loginError = (
    error: string
) => ({
    type: 'LOGIN/ERROR',
    error
} as const);


export type LoginActions =
    | SetUserProfileType
    | ReturnType<typeof loginError>
    | SetErrorActionType



export const signIn = (payload: LoginDataType) => (dispatch: Dispatch) => {
    dispatch(setAppLoading(true))
    authApi
        .login(payload)
        .then((res) => {
            // dispatch(loginSuccess());
            dispatch(setUserProfile(res.data));
            dispatch(setInitializedAC(true))
            dispatch(loginError(''));
        })
        .catch((err) => {
            const error = err.response
                ? err.response.data.error
                : err.message + ', more details in the console';
            console.log('Error: ', {...err});
            dispatch(loginError(error));
            // dispatch(setErrorAC(error))
        })
        .finally(() => dispatch(setAppLoading(false)))
};


export const checkAuthMe = () => (dispatch: Dispatch) => {
    dispatch(setAppLoading(true))
    authApi.me()
        .then((res) => {
            dispatch(setInitializedAC(true));
            dispatch(setUserProfile(res.data))
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() =>   dispatch(setAppLoading(false)))
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
            dispatch(setCardPacksPageCountAC(10))
            dispatch(setCardsPageCountAC(10))
            dispatch(setCardsPacksCountFromRangeAC([0, 1000]))
            dispatch(setInitializedAC(false))
        })
        .catch((err) => {
            const error = err.response
                ? err.response.data.error
                : err.message + ', more details in the console';
            console.log('Error: ', {...err});
            dispatch(loginError(error));
            dispatch(setErrorAC(error))
            dispatch(setAppLoading(false))
        });
};

