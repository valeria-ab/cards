const initialState: InitialStateType = {
    cardPacks: {
        totalCount: 10, // for pagination
        pageCount: 10, // for pagination
        page: 1, // for pagination
        max: 200, // for range slider
        min: 0, // for range slider
        packName: '', // for search
        sortPacks: null, // for sorting
    },
    cards: {
        totalCount: 10,
        pageCount: 10,
        page: 1,
        selectedCardId: '',
        questionText: '',
        sortCards: null
    }
}

export const findAndPaginationReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        // for CardPacks
        case "FIND-AND-PAGINATION/SET-CARDS-PACKS-COUNT":
            return {...state, cardPacks: {...state.cardPacks, max: action.max, min: action.min}}
        case "FIND-AND-PAGINATION/SET-CARD-PACKS-CURRENT-PAGE":
        case "FIND-AND-PAGINATION/SET-CARD-PACKS-PAGE-COUNT":
        case "FIND-AND-PAGINATION/SET-CARD-PACKS-TOTAL-COUNT":
        case "FIND-AND-PAGINATION/SET-SEARCH-PACK-NAME":
        case "FIND-AND-PAGINATION/SET-SORT-PACKS":
            return {...state, cardPacks: {...state.cardPacks, ...action.payload}}

        // for OldCards
        case "FIND-AND-PAGINATION/SET-CARDS-TOTAL-COUNT":
        case "FIND-AND-PAGINATION/SET-CARDS-PAGE-COUNT":
        case 'FIND-AND-PAGINATION/SET-CARDS-CURRENT-PAGE':
        case 'FIND-AND-PAGINATION/SET-SEARCH-QUESTION':
        case "FIND-AND-PAGINATION/SET-SELECTED-CARD-ID":
        case "FIND-AND-PAGINATION/SET-SORT-CARDS":
            return {...state, cards: {...state.cards, ...action.payload}}
        default:
            return state
    }
}

type InitialStateType = {
    cardPacks: {
        totalCount: number
        pageCount: number
        page: number
        min: number
        max: number
        packName: string
        sortPacks: SortPackType
    }
    cards: {
        totalCount: number
        pageCount: number
        page: number
        selectedCardId: string
        questionText: string
        sortCards: SortCardsType
    }
}

//AC for CardPacks:
export const setCardPacksTotalCountAC = (totalCount: number) =>
    ({type: 'FIND-AND-PAGINATION/SET-CARD-PACKS-TOTAL-COUNT', payload: {totalCount}} as const)
export const setCardPacksPageCountAC = (pageCount: number) =>
    ({type: 'FIND-AND-PAGINATION/SET-CARD-PACKS-PAGE-COUNT', payload: {pageCount}} as const)
export const setCardPacksCurrentPageAC = (page: number) =>
    ({type: 'FIND-AND-PAGINATION/SET-CARD-PACKS-CURRENT-PAGE', payload: {page}} as const)
export const setCardsPacksCountAC = (numbers: Array<number> ) =>  // min and max cardsPacks
    ({type: 'FIND-AND-PAGINATION/SET-CARDS-PACKS-COUNT', min: numbers[0], max: numbers[1]} as const)
export const setSearchPackNameAC = (packName: string) =>
    ({type: 'FIND-AND-PAGINATION/SET-SEARCH-PACK-NAME', payload: {packName}} as const)
export const setSortPacksAC = (sortPacks: SortPackType) =>
    ({type: 'FIND-AND-PAGINATION/SET-SORT-PACKS', payload: {sortPacks}} as const)

//AC for OldCards:
export const setCardsTotalCountAC = (totalCount: number) =>
    ({type: 'FIND-AND-PAGINATION/SET-CARDS-TOTAL-COUNT', payload: {totalCount}} as const)
export const setCardsPageCountAC = (pageCount: number) =>
    ({type: 'FIND-AND-PAGINATION/SET-CARDS-PAGE-COUNT', payload: {pageCount}} as const)
export const setCardsCurrentPageAC = (page: number) =>
    ({type: 'FIND-AND-PAGINATION/SET-CARDS-CURRENT-PAGE', payload: {page}} as const)
export const setSearchQuestionAC = (questionText: string) =>
    ({type: 'FIND-AND-PAGINATION/SET-SEARCH-QUESTION', payload: {questionText}} as const)
export const setSelectedCardIdAC = (selectedCardId: string) =>
    ({type: 'FIND-AND-PAGINATION/SET-SELECTED-CARD-ID', payload: {selectedCardId}} as const)
export const setSortCardsAC = (sortCards: SortCardsType) =>
    ({type: 'FIND-AND-PAGINATION/SET-SORT-CARDS', payload: {sortCards}} as const)

export type SetCardPacksTotalCountType = ReturnType<typeof setCardPacksTotalCountAC>
export type SetCardsTotalCountType = ReturnType<typeof setCardsTotalCountAC>
export type SetSelectedCardIdType = ReturnType<typeof setSelectedCardIdAC>

type ActionType =
    | SetCardPacksTotalCountType
    | ReturnType<typeof setCardPacksPageCountAC>
    | ReturnType<typeof setCardPacksCurrentPageAC>
    | ReturnType<typeof setCardsPacksCountAC>
    | SetCardsTotalCountType
    | ReturnType<typeof setCardsPageCountAC>
    | ReturnType<typeof setCardsCurrentPageAC>
    | ReturnType<typeof setSearchPackNameAC>
    | ReturnType<typeof setSortPacksAC>
    | ReturnType<typeof setSearchQuestionAC>
    | SetSelectedCardIdType
    | ReturnType<typeof setSortCardsAC>

export type SortPackType = '0name' | '1name' | '0cardsCount' | '1cardsCount' | '0updated'| '1updated' | '0user_name' | '1user_name' | null
export type SortCardsType = '0answer' | '1answer' | '0question' | '1question' | '0grade' | '1grade' | '0updated' | '1updated' | null