import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { api, LoginDataType } from "../../DAL/api";
import { setUserProfile } from "../profile/profileActions";
import { IAppStore } from "../store/store";
import { LoginActions, loginError, loginSuccess } from "./loginActions";

type Return = void;
type ExtraArgument = {};
type IGetStore = () => IAppStore;

export const signIn =
  (
    payload: LoginDataType
  ): ThunkAction<Return, IAppStore, ExtraArgument, LoginActions> =>
  (
    dispatch: ThunkDispatch<IAppStore, ExtraArgument, LoginActions>,
    getStore: IGetStore
  ) => {
    api
      .login(payload)
      .then((res) => {
        dispatch(loginSuccess());
        dispatch(setUserProfile(res.data));
        dispatch(loginError("", true));
      })
      .catch((err) => {
        const error = err.response
          ? err.response.data.error
          : err.message + ", more details in the console";
        console.log("Error: ", { ...err });
        dispatch(loginError(error, false));
      });
  };
