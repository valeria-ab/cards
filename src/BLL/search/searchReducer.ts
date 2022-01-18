import {searchInitialState, SearchState} from './searchInitialState';
import {SEARCH_SET_VALUE, SearchActions} from './searchActions';

export const searchReducer = (
    state: SearchState = searchInitialState,
    action: SearchActions
) => {
    switch (action.type) {
        case SEARCH_SET_VALUE: {
            return {...state, value: action.value};
        }

        default: {
            return state;
        }
    }
};
