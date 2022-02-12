import {Dispatch} from "redux";
import {setErrorAC, SetErrorActionType} from '../app/app-reducer';
import {forgotApi} from '../../DAL/forgot-api';

export type InitialStateType = {
    isRequestSend: boolean
}

const initialState: InitialStateType = {
    isRequestSend: false
};

export const forgotReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "FORGOT/SEND-REQUEST": {
            return {...state, isRequestSend: action.isRequestSend}
        }

        default:
            return state;
    }
};


export const sendRequestAC = (isRequestSend: boolean) => ({
    type: 'FORGOT/SEND-REQUEST',
    isRequestSend
} as const);


export type SendRequestActionType = ReturnType<typeof sendRequestAC>


type ActionsType = SendRequestActionType | SetErrorActionType


// thunk

export const forgotPasswordTC = (email: string) => (dispatch: Dispatch) => {
    forgotApi.forgotPassword(email)
        .then(() => {
           dispatch(sendRequestAC(true))
        })
        .catch((error) => {
            console.log(error);
            dispatch(setErrorAC(error))
        })
}







