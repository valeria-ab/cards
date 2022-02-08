import {LoginActions, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS} from './loginActions';
import {loginInitialState, LoginState} from './loginInitialState';

export const loginReducer = (
    state: LoginState = loginInitialState,
    action: LoginActions
) => {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return {...state, isLoggedIn: true};
        }
        case LOGIN_ERROR: {
            return {...state, isLoggedIn: action.isLoggedIn, error: action.error};
        }
        case LOGOUT_SUCCESS: {
            return {...state, isLoggedIn: action.isLoggedIn};
        }
        default: {
            return state;
        }
    }
};
