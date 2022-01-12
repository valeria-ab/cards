import {Dispatch} from "redux";
import {api} from "../../DAL/api";

export type InitialStateType = {
    isSend: boolean
}

const initialState: InitialStateType = {
    isSend: false
};

export const newPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "PASSWORD/SEND-NEW_PASSWORD": {
            return {...state, isSend: action.isSend}
        }

        default:
            return state;
    }
};


export const sendPasswordRequestAC = (isSend: boolean) => ({
    type: 'PASSWORD/SEND-NEW_PASSWORD',
    isSend
} as const);


export type SendPasswordRequestActionType = ReturnType<typeof sendPasswordRequestAC>


type ActionsType = SendPasswordRequestActionType


// thunk

export const sendNewPasswordTC = (password: string, token: string) => (dispatch: Dispatch) => {
    api.newPassword(password, token)
        .then(() => {
           dispatch(sendPasswordRequestAC(true))
        })
        .catch((error) => {
            alert(error)
        })
}







