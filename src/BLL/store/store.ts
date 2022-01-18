import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {profileReducer} from "../profile/profileReducer";
import {registerReducer} from "../register/registerReducer";
import {loginReducer} from "../login/loginReducer";
import {forgotReducer} from "../forgot/forgot-reducer";
import {newPasswordReducer} from "../forgot/newPassword-reducer";
import {packsReducer} from "../packs/packs-reducer";
import {searchReducer} from '../search/searchReducer';


const reducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    forgot: forgotReducer,
    profile: profileReducer,
    newPasswordReducer: newPasswordReducer,
    packs: packsReducer,
    search: searchReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;

export type IAppStore = ReturnType<typeof reducers>;

// @ts-ignore
window.store = store;
