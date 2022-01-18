export const SEARCH_SET_VALUE = 'SEARCH/SET_VALUE';


export const setSearchValue = (value: string): SetValueType => ({
    type: SEARCH_SET_VALUE,
    value
})


//types
type SetValueType = {
    type: typeof SEARCH_SET_VALUE
    value: string
}

export type SearchActions = SetValueType
