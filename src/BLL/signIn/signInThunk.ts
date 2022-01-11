import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { IAppStore } from "../store/store";
import { SignInActions } from "./signInActions";

type Return = void;
type ExtraArgument = {};
type IGetStore = () => IAppStore;

export const signIn =
  (
    email: string,
    password: string,
    rememberMe: boolean
  ): ThunkAction<Return, IAppStore, ExtraArgument, SignInActions> =>
  async (
    dispatch: ThunkDispatch<IAppStore, ExtraArgument, SignInActions>,
    getStore: IGetStore
  ) => {};
