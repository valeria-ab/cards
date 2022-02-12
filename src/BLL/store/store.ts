import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {loginReducer} from '../login/login-reducer';
import {forgotReducer} from '../forgot/forgot-reducer';
import {newPasswordReducer} from '../forgot/newPassword-reducer';
import {packsReducer} from '../packs/packs-reducer';
import {cardsReducer} from '../cards/cards-reducer';
import {appReducer} from '../app/app-reducer';
import {registerReducer} from '../register/register-reducer';
import {profileReducer} from '../profile/profile-reducer';


const reducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    forgot: forgotReducer,
    profile: profileReducer,
    newPassword: newPasswordReducer,
    packs: packsReducer,
    cards: cardsReducer,
    app: appReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;

export type IAppStore = ReturnType<typeof reducers>;

// @ts-ignore
window.store = store;
