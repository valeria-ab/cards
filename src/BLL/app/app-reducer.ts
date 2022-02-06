

type InitialAppStateType = {
   isLoading: boolean
}

const initialState: InitialAppStateType = {
    isLoading: false
};

export const appReducer = (state: InitialAppStateType = initialState, action: ActionsType): InitialAppStateType => {
    switch (action.type) {
        case 'APP/SET-LOADING': {
            return {...state, isLoading: action.value}
        }
        default:
            return state;
    }
};


export const setAppLoading = (value: boolean) => ({
    type: 'APP/SET-LOADING',
    value
} as const);



type ActionsType = ReturnType<typeof setAppLoading>















