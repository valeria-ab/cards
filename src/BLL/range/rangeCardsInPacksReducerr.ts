const initialState: InitialStateType = {
        max: 200, // for range slider
        min: 0, // for range slider
}

type InitialStateType = {
        min: number
        max: number
}


export const rangeCardsInPacksReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'RANGE/SET-CARDS-PACKS-COUNT':
            return {...state,  min: action.min, max: action.max}
        default:
            return state
    }
}

export const setCardsPacksCountAC = (numbers: Array<number> ) =>  // min and max cardsPacks
    ({type: 'RANGE/SET-CARDS-PACKS-COUNT', min: numbers[0], max: numbers[1]} as const)

type ActionType = ReturnType<typeof setCardsPacksCountAC>
