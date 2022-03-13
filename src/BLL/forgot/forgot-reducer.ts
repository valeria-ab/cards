import {Dispatch} from "redux";
import {setAppLoading, setErrorAC, SetErrorActionType} from '../app/app-reducer';
import {forgotApi} from '../../DAL/forgot-api';

export type InitialStateType = {
    isRequestSend: boolean
    isSend: boolean
}

const initialState: InitialStateType = {
    isRequestSend: false,
    isSend: false
};

export const forgotReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "FORGOT/SEND-REQUEST": {
            return {...state, isRequestSend: action.isRequestSend}
        }
        case "PASSWORD/SEND-NEW_PASSWORD": {
            return {...state, isSend: action.isSend}
        }
        default:
            return state;
    }
};


export const sendRequestAC = (isRequestSend: boolean) => ({
    type: 'FORGOT/SEND-REQUEST',
    isRequestSend
} as const);
export const sendPasswordRequestAC = (isSend: boolean) => ({
    type: 'PASSWORD/SEND-NEW_PASSWORD',
    isSend
} as const);

export type SendRequestActionType = ReturnType<typeof sendRequestAC>


type ActionsType = SendRequestActionType | SetErrorActionType |  ReturnType<typeof sendPasswordRequestAC>


// thunk

export const forgotPasswordTC = (email: string) => (dispatch: Dispatch) => {
    dispatch(setAppLoading(true))
    forgotApi.forgotPassword(email)
        .then(() => {
           dispatch(sendRequestAC(true))
        })
        .catch((error) => {
            dispatch(setErrorAC(error.response.data.error))
        })
        .finally(() => dispatch(setAppLoading(false)))
}

export const sendNewPasswordTC = (password: string, token: string) => (dispatch: Dispatch) => {
    forgotApi.newPassword(password, token)
        .then(() => {
            dispatch(sendPasswordRequestAC(true))
        })
        .catch((error) => {
            dispatch(setErrorAC(error.response.data.error))
        })
}




