import {LoginActions, LOGIN_ERROR, LOGIN_SUCCESS} from './loginActions';
import {loginInitialState, LoginState} from './loginInitialState';

export const loginReducer = (
    state: LoginState = loginInitialState,
    action: LoginActions
) => {
    switch (action.type) {
        // case LOGIN_SUCCESS: {
        //     return {...state, isLoggedIn: true};
        // }
        case LOGIN_ERROR: {
            return {...state, error: action.error};
        }
        default: {
            return state;
        }
    }
};
