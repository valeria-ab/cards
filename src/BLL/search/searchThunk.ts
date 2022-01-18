import {Dispatch} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {api, LoginDataType} from "../../DAL/api";
import {setUserProfile} from "../profile/profileActions";
import {IAppStore} from "../store/store";
import {SearchActions} from './searchActions';


type Return = void;
type ExtraArgument = {};
type IGetStore = () => IAppStore;

export const signIn =
    (
        payload: LoginDataType
    ): ThunkAction<Return, IAppStore, ExtraArgument, SearchActions> =>
        (
            dispatch: ThunkDispatch<IAppStore, ExtraArgument, SearchActions>,
            getStore: IGetStore
        ) => {
            api
                .login(payload)
                .then((res) => {

                })
                .catch((err) => {

                    console.log("Error: ", {...err});

                });
        };








