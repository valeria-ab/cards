import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { api, LoginDataType } from "../../DAL/api";
import { setUserProfile } from "../profile/profileReducer";
import { IAppStore } from "../store/store";
import { SignInActions, signInError, signInSuccess } from "./signInActions";

type Return = void;
type ExtraArgument = {};
type IGetStore = () => IAppStore;

export const signIn =
  (
    payload: LoginDataType
  ): ThunkAction<Return, IAppStore, ExtraArgument, SignInActions> =>
  (
    dispatch: ThunkDispatch<IAppStore, ExtraArgument, SignInActions>,
    getStore: IGetStore
  ) => {
    api
      .login(payload)
      .then((res) => {
        // console.log(res.data);
        dispatch(signInSuccess());
        dispatch(setUserProfile(res.data));
      })
      .catch((err) => {
        debugger;
        const error = err.response
          ? err.response.data.error
          : err.message + ", more details in the console";
        console.log("Error: ", { ...err });
        console.log(error);
        dispatch(signInError(error));
      });
  };
