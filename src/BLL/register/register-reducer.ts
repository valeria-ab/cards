import {Dispatch} from "redux";
import {setAppLoading, setErrorAC, SetErrorActionType} from '../app/app-reducer';
import {registerApi} from '../../DAL/register-api';

type InitialStateType = typeof initialState

export const initialState = {
  isRegistration: false,
  message: '',
}

type actionType = successRegistrationType | SetErrorActionType

 export const registerReducer = (state: InitialStateType = initialState, action: actionType): InitialStateType => {
    switch (action.type) {
      case "REGISTRATION/IS-REGISTRATION-SUCCESS":
        return {...state, isRegistration: true}

      default: {
        return state;
      }
    }
  };

export const successRegistrationAC = (isRegistration: boolean) => {
  return {type: 'REGISTRATION/IS-REGISTRATION-SUCCESS', isRegistration } as const
}

export const registrationTC = (payload : {email: string, password: string}) => (dispatch: Dispatch) => {
    dispatch(setAppLoading(true))
    registerApi.register(payload)
      .then((res)=>{
        dispatch(successRegistrationAC(true))
      })
      .catch((error)=> {
          dispatch(setErrorAC(error.response.data.error))
      })
        .finally(() => dispatch(setAppLoading(false)))
}

type successRegistrationType = ReturnType<typeof successRegistrationAC>
