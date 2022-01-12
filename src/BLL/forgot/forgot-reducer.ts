import {Dispatch} from "redux";
import {api} from "../../DAL/api";

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


type ActionsType = SendRequestActionType


// thunk

export const forgotPasswordTC = (email: string) => (dispatch: Dispatch) => {
    api.forgotPassword(email)
        .then(() => {
           dispatch(sendRequestAC(true))
        })
        .catch((error) => {
            alert(error)
        })
}







