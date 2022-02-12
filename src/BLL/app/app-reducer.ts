

type InitialAppStateType = {
   isLoading: boolean
    error: string | null
    isInitialized: boolean
}

const initialState: InitialAppStateType = {
    isLoading: false,
    error: null,
    isInitialized: false
};

export const appReducer = (state: InitialAppStateType = initialState, action: ActionsType): InitialAppStateType => {
    switch (action.type) {
        case 'APP/SET-LOADING': {
            return {...state, isLoading: action.value}
        }
        case 'APP/SET-IS_INITIALIZED': {
            return {...state, isInitialized: action.value}
        }
        case 'APP/SET-ERROR':
            return { ...state, error: action.error };
        default:
            return state;
    }
};


export const setAppLoading = (value: boolean) => ({
    type: 'APP/SET-LOADING',
    value
} as const);

export const setErrorAC = (error: string | null) => ( {
    type: 'APP/SET-ERROR',
    error
} as const );

export const setInitializedAC = (value: boolean) => ( {
    type: 'APP/SET-IS_INITIALIZED',
    value
} as const );

export type SetErrorActionType = ReturnType<typeof setErrorAC>

type ActionsType = ReturnType<typeof setAppLoading>
    | SetErrorActionType
| ReturnType<typeof setInitializedAC>















