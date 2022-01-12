import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { api, LoginDataType } from "../../DAL/api";
import { IAppStore } from "../store/store";
import { SignInActions, SignInSuccess } from "./signInActions";

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
    api.login(payload)
    .then((res) => {
      console.log(res.data);
     dispatch(SignInSuccess());
     const domainUserData = {
      _id: res.data._id,
      email: res.data.email,
      name: "",
      publicCardPacksCount: 0,
      created: "",
      updated: "",
      isAdmin: false,
      verified: false,
      rememberMe: false,
     }
    // dispatch(actions.setUserProfile(res.data))
    })
    .catch((err) => {
      //чтобы посмотреть объект ошибки
      // console.log('Error: ', {...err})
      const error = err.response
        ? err.response.data.error
        : err.message + ", more details in the console";
      console.log(error);
    });
  };
