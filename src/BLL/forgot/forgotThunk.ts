import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { IAppStore } from "../store/store";
import { IForgotActions } from "./forgotActions";

type Return = void;
type ExtraArgument = {};
type IGetStore = () => IAppStore;

export const forgot =
  (
    email: string
  ): ThunkAction<Return, IAppStore, ExtraArgument, IForgotActions> =>
  async (
    dispatch: ThunkDispatch<IAppStore, ExtraArgument, IForgotActions>,
    getStore: IGetStore
  ) => {};
