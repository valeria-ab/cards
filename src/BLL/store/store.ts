import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { forgotReducer } from "../forgot/forgotReducer";
import { profileReducer } from "../profile/profileReducer";
import { registerReducer } from "../register/registerReducer";
import { signInReducer } from "../signIn/signInReducer";

const reducers = combineReducers({
  signIn: signInReducer,
  register: registerReducer,
  forgot: forgotReducer,
  profile: profileReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;

export type IAppStore = ReturnType<typeof reducers>;

// @ts-ignore
window.store = store;
