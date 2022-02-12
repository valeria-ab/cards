import {ProfileActions, setUserProfile} from './profileActions';
import {
    initialProfileState,
    InitialProfileStateType,
} from './profileInitialState';
import {ThunkAction} from 'redux-thunk';
import {IAppStore} from '../store/store';
import {AnyAction} from 'redux';
import {setAppLoading, setErrorAC} from '../app/app-reducer';
import {authApi} from '../../DAL/auth-api';

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


export const changeUserNameOrAvatar = (name?: string, avatar?: string): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch) => {
    dispatch(setAppLoading(true))
    authApi.changeName({name, avatar})
        .then((res) => {
            debugger
            dispatch(setUserProfile(res.data.updatedUser))
        })
        .catch((err) => {
            dispatch(setErrorAC(err))
        })
        .finally(() => dispatch(setAppLoading(false)))
}