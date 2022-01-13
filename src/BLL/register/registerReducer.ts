
import {Dispatch} from "redux";
import {api} from "../../DAL/api";

type InitialStateType = typeof initialState

export const initialState = {
  isRegistration: false,
  message: '',
}

type actionType = successRegistrationType

 export const registerReducer = (state: InitialStateType = initialState, action: actionType): InitialStateType => {
    switch (action.type) {
      case "ISSUCCESSREGISTRATION":
        return {...state, isRegistration: true}

      default: {
        return state;
      }
    }
  };

export const successRegistrationAC = (isRegistration: boolean) => {
  return {type: 'ISSUCCESSREGISTRATION', isRegistration } as const
}

export const registrationTC = (payload : {email: string, password: string}) => (dispatch: Dispatch) => {
  api.register(payload)
      .then((res)=>{
        dispatch(successRegistrationAC(true))
      })
}

type successRegistrationType = ReturnType<typeof successRegistrationAC>
