import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { IAppStore } from "../store/store";
import { IRegisterActions } from "./registerActions";

type Return = void;
type ExtraArgument = {};
type IGetStore = () => IAppStore;

export const register =
  (
    email: string,
    password: string
  ): ThunkAction<Return, IAppStore, ExtraArgument, IRegisterActions> =>
  async (
    dispatch: ThunkDispatch<IAppStore, ExtraArgument, IRegisterActions>,
    getStore: IGetStore
  ) => {};
