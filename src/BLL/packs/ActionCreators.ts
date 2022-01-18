

export const Packs_SET_MIN_CARDS_COUNT_VALUE = 'packsReducer/SET_MIN_CARDS_COUNT_VALUE';
export const Packs_SET_MAX_CARDS_COUNT_VALUE = 'packsReducer/SET_MAX_CARDS_COUNT_VALUE';

export const setMinCardsCount = (value: number): SetMinCardsCountType => ({
    type: Packs_SET_MIN_CARDS_COUNT_VALUE,
    value
})

export const setMaxCardsCount = (value: number): SetMaxCardsCountType => ({
    type: Packs_SET_MAX_CARDS_COUNT_VALUE,
    value
})

//types
type SetMinCardsCountType = {
    type: typeof Packs_SET_MIN_CARDS_COUNT_VALUE
    value: number
}
type SetMaxCardsCountType = {
    type: typeof Packs_SET_MAX_CARDS_COUNT_VALUE
    value: number
}

export type ACTypes = SetMinCardsCountType | SetMaxCardsCountType
