import {CardPacksType, packsApi, PacksResponseType, PacksType, SortingPacksType} from '../../DAL/packs-api';
import {AnyAction, Dispatch} from 'redux';
import {IAppStore} from '../store/store';
import {ThunkAction} from 'redux-thunk';
import {setAppLoading, setErrorAC} from '../app/app-reducer';



export type InitialStateType = {

    cardPacks: CardPacksType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    packName: string
    cardsValuesFromRange: Array<number>
    withMyId: boolean
    sortingBy: null | SortingPacksType
}

const initialState: InitialStateType = {
    cardPacks: [] as CardPacksType[],
    cardPacksTotalCount: 1,
    maxCardsCount: Infinity as number,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
    packName: '', //for search
    cardsValuesFromRange: [0, 1000],
    withMyId: true,
    sortingBy: null ,
};

export const packsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS':
            return {...state, ...action.payload}
        case 'PACKS/SET-CARD-PACKS-CURRENT-PAGE':
            return {...state, page: action.page}
        case 'PACKS/SET-CARD-PACKS-PAGE-COUNT':
            return {...state, pageCount: action.pageCount}
        case 'PACKS/SET-SEARCH-PACK-NAME':
            return {...state, packName: action.packName}
        case 'PACKS/SET-WITH-MY-ID':
            return {...state, withMyId: action.withMyId}
        case 'PACKS/RANGE-SET-CARDS-PACKS-COUNT':
            return {...state, cardsValuesFromRange: [action.min, action.max]}
        case 'PACKS/SET-SORT-PACKS-COUNT':
            return {...state, sortingBy: action.value}
        // case 'PACKS/SET-MAX-CARDS-COUNT':
        //     return {...state, maxCardsCount: action.maxCardsCount}
        // case 'PACKS/SET-MIN-CARDS-COUNT':
        //     return {...state, minCardsCount: action.minCardsCount}
        default:
            return state;
    }
};


export const setPacksAC = (payload: PacksResponseType) => ({
    type: 'PACKS/SET-PACKS', payload
} as const);

export const setCardPacksCurrentPageAC = (page: number) =>
    ({type: 'PACKS/SET-CARD-PACKS-CURRENT-PAGE', page} as const)
export const setCardPacksPageCountAC = (pageCount: number) =>
    ({type: 'PACKS/SET-CARD-PACKS-PAGE-COUNT', pageCount} as const)
export const setSearchPackNameAC = (packName: string) =>
    ({type: 'PACKS/SET-SEARCH-PACK-NAME', packName} as const)
export const setWithMyIdAC = (withMyId: boolean) =>
    ({type: 'PACKS/SET-WITH-MY-ID', withMyId} as const)

export const setCardsPacksCountFromRangeAC = (numbers: Array<number>) =>  // min and max cardsPacks
    ({type: 'PACKS/RANGE-SET-CARDS-PACKS-COUNT', min: numbers[0], max: numbers[1]} as const)

export const setSortPacksValueAC = (value: SortingPacksType | null) =>
    ({type: 'PACKS/SET-SORT-PACKS-COUNT', value} as const)

export type GetPacksActionType = ReturnType<typeof setPacksAC>


type ActionsType =
    GetPacksActionType
    | ReturnType<typeof setCardPacksCurrentPageAC>
    | ReturnType<typeof setCardPacksPageCountAC>
    | ReturnType<typeof setSearchPackNameAC>
    | ReturnType<typeof setWithMyIdAC>
    | ReturnType<typeof setCardsPacksCountFromRangeAC>
    // | ReturnType<typeof setMaxCardsCountAC>
    // | ReturnType<typeof setMinCardsCountAC>
    | ReturnType<typeof setAppLoading>
    | ReturnType<typeof setSortPacksValueAC>


// thunk
export const getPacksTC = (payload?: PacksType) => (dispatch: Dispatch, getState: () => IAppStore) => {

    const {
        page,
        pageCount,
        cardsValuesFromRange,
        packName,
        withMyId,
        sortingBy,
    } = getState().packs;

    const id = getState().profile._id

    let mainPayload = withMyId
        ? {
            user_id: id,
            page,
            pageCount,
            min: cardsValuesFromRange[0],
            max: cardsValuesFromRange[1],
            packName: packName,
        }
        : {
            page,
            pageCount,
            min: cardsValuesFromRange[0],
            max: cardsValuesFromRange[1],
            packName: packName,
        }
if (sortingBy) { // @ts-ignore
    mainPayload = {...mainPayload, sortPacks: sortingBy}}

    dispatch(setAppLoading("loading"))

    packsApi.getPacks({
        ...mainPayload,
        ...payload
    })
        .then((res) => {
            dispatch(setPacksAC(res.data))
        })
        .catch((err) => {
            dispatch(setErrorAC(err))
        })
        .finally(() => dispatch(setAppLoading("succeeded")))

}

export const createPack = (name: string, user_id?: string): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch) => {
    dispatch(setAppLoading("loading"))
    packsApi.createPack({name})
        .then((res) => {
            dispatch(getPacksTC({user_id}))
        })
        .catch((err) => {
            dispatch(setErrorAC(err))
        })
        .finally(() => dispatch(setAppLoading("succeeded")))
}


export const deletePack = (packID: string, user_id?: string): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch) => {
    dispatch(setAppLoading("loading"))
    packsApi.deletePack(packID)
        .then((res) => {
            dispatch(getPacksTC({user_id}))
        })
        .catch((err) => {
            dispatch(setErrorAC(err))
        })
        .finally(() => dispatch(setAppLoading("idle")))
}


export const updatePack = (payload: CardPacksType): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch, getState: () => IAppStore) => {
    const pack = getState().packs.cardPacks.find((pack) => pack._id === payload._id)

    const updatePack = {...pack, ...payload};
    dispatch(setAppLoading("loading"))
    packsApi.updatePack(updatePack)
        .then((res) => {
            dispatch(getPacksTC())
        })
        .catch((err) => {
            dispatch(setErrorAC(err))
        })
        .finally(() => dispatch(setAppLoading("idle")))
}







