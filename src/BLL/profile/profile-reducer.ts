import {ProfileActions, setUserProfile} from './profileActions';
import {ThunkAction} from 'redux-thunk';
import {IAppStore} from '../store/store';
import {AnyAction} from 'redux';
import {setAppLoading, setErrorAC} from '../app/app-reducer';
import {authApi} from '../../DAL/auth-api';

export type InitialProfileStateType = typeof initialProfileState;

const initialProfileState = {
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
    __v: 0,
};

export const profileReducer = (
    state: InitialProfileStateType = initialProfileState,
    action: ProfileActions
): InitialProfileStateType => {
    switch (action.type) {
        case 'ProfilePage/SET_USER_PROFILE': {
            return {
                ...state,
                ...action.userData,
            };
        }

        default:
            return state;
    }
};


export const changeUserName = (name: string): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch) => {
    dispatch(setAppLoading(true))
    authApi.changeName(name)
        .then((res) => {
            dispatch(setUserProfile(res.data.updatedUser))
        })
        .catch((err) => {
            dispatch(setErrorAC(err))
        })
        .finally(() => dispatch(setAppLoading(false)))
}

export const changeProfilePhoto = (avatar: string | ArrayBuffer | null ): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch) => {
    dispatch(setAppLoading(true))

    authApi.changeProfilePhoto(avatar)
        .then((res) => {
            dispatch(setUserProfile(res.data.updatedUser))
        })
        .catch((err) => {
            dispatch(setErrorAC(err))
        })
        .finally(() => dispatch(setAppLoading(false)))
}

export const changeProfileData = (name: string, avatar: string | ArrayBuffer | null ): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch) => {
    dispatch(setAppLoading(true))

    authApi.changeProfileData(name, avatar)
        .then((res) => {
            dispatch(setUserProfile(res.data.updatedUser))
        })
        .catch((err) => {
            dispatch(setErrorAC(err))
        })
        .finally(() => dispatch(setAppLoading(false)))
}