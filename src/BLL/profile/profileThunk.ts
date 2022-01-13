import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { IAppStore } from "../store/store";

type Return = void;
type ExtraArgument = {};
type IGetStore = () => IAppStore;
