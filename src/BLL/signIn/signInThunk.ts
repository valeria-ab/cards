import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { IAppStore } from "../store/store";
import { ISignInActions } from "./signInActions";

type Return = void;
type ExtraArgument = {};
type IGetStore = () => IAppStore;

export const signIn =
  (
    email: string,
    password: string,
    rememberMe: boolean
  ): ThunkAction<Return, IAppStore, ExtraArgument, ISignInActions> =>
  async (
    dispatch: ThunkDispatch<IAppStore, ExtraArgument, ISignInActions>,
    getStore: IGetStore
  ) => {};
