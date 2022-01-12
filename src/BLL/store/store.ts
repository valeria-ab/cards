import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

import { profileReducer } from "../profile/profileReducer";
import { registerReducer } from "../register/registerReducer";
import { signInReducer } from "../signIn/signInReducer";
import {forgotReducer} from "../forgot/forgot-reducer";
import {newPasswordReducer} from "../forgot/newPassword-reducer";

const reducers = combineReducers({
  signIn: signInReducer,
  register: registerReducer,
  forgot: forgotReducer,
  profile: profileReducer,
  newPasswordReducer:newPasswordReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;

export type IAppStore = ReturnType<typeof reducers>;

// @ts-ignore
window.store = store;
