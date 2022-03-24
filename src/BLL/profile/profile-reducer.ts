
import {ThunkAction} from 'redux-thunk';
import {IAppStore} from '../store/store';
import {AnyAction} from 'redux';
import {setAppLoading, setErrorAC, setInitializedAC} from '../app/app-reducer';
import {authApi} from '../../DAL/auth-api';
import {UserDomainType} from '../../DAL/api';
import {logOut, redirectToLogin} from '../login/login-reducer';
import {
    setCardPacksPageCountAC,
    setCardsPacksCountFromRangeAC,
    setSortPacksValueAC,
    setWithMyIdAC
} from '../packs/packs-reducer';
import {changeLayoutAC, setCardsPageCountAC} from '../cards/cards-reducer';


//types
export type SetAppStatusActionType = SetUserProfileType;
export type SetUserProfileType = ReturnType<typeof setUserProfile>;
export type ProfileActions = SetAppStatusActionType;
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

export const setUserProfile = (userData: UserDomainType) =>
    ({ type: "ProfilePage/SET_USER_PROFILE", userData } as const);



export const changeUserName = (name: string): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch) => {
    dispatch(setAppLoading("loading"))
    authApi.changeName(name)
        .then((res) => {
            dispatch(setUserProfile(res.data.updatedUser))
        })
        .catch((err) => {
            dispatch(setErrorAC(err.response.data.error))
            if(err.response.data.error === "you are not authorized /ᐠ-ꞈ-ᐟ\\") {
                dispatch(setInitializedAC(false))
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
                dispatch(redirectToLogin(true))

                dispatch(setWithMyIdAC(true))
                dispatch(changeLayoutAC("profile"))
                dispatch(setSortPacksValueAC(""))
            }
        })
        .finally(() => dispatch(setAppLoading("idle")))
}

export const changeProfilePhoto = (avatar: string | ArrayBuffer | null ): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch) => {
    dispatch(setAppLoading("loading"))

    authApi.changeProfilePhoto(avatar)
        .then((res) => {
            dispatch(setUserProfile(res.data.updatedUser))
        })
        .catch((err) => {
            dispatch(setErrorAC(err.response.data.error))
            if(err.response.data.error === "you are not authorized /ᐠ-ꞈ-ᐟ\\") {
                dispatch(setInitializedAC(false))
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
                dispatch(redirectToLogin(true))

                dispatch(setWithMyIdAC(true))
                dispatch(changeLayoutAC("profile"))
                dispatch(setSortPacksValueAC(""))
            }
        })
        .finally(() => dispatch(setAppLoading("idle")))
}

// export const changeProfileData = (name: string, avatar: string | ArrayBuffer | null ): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch) => {
//     dispatch(setAppLoading("loading"))
//
//     authApi.changeProfileData(name, avatar)
//         .then((res) => {
//             dispatch(setUserProfile(res.data.updatedUser))
//         })
//         .catch((err) => {
//             dispatch(setErrorAC(err.response.data.error))
//             if(err.response.data.error === "you are not authorized /ᐠ-ꞈ-ᐟ\\") {
//                 dispatch(logOut())
//             }
//         })
//         .finally(() => dispatch(setAppLoading("idle")))
// }

