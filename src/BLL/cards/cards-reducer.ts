import {AnyAction, Dispatch} from 'redux';
import {
    CardRequestType,
    CardResponseType,
    cardsApi,
    CardsResponseType,
    CardsType
} from '../../DAL/CardsAPI';
import {ThunkAction} from 'redux-thunk';
import {IAppStore} from '../store/store';
import {UpdatePacksType} from '../../DAL/Packs-api';

export type InitialStateType = {
    cards: CardResponseType[],
    cardsTotalCount: number
    maxGrade: number | null
    minGrade: number | null
    page: number
    pageCount: number
    packUserId: string | null
}

const initialState: InitialStateType = {
    cards: [],
    cardsTotalCount: 10,
    maxGrade: null,
    minGrade: null,
    page: 1,
    pageCount: 10,
    packUserId: null,
};

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CARDS/GET-CARDS': {
            return {...state, ...action.cards}
        }
        case 'CARDS/SET-CARDS-CURRENT-PAGE': {
            return {...state, page: action.page}
        }
        case 'CARDS/SET-CARDS-PAGE-COUNT': {
            return {...state, pageCount: action.pageCount}
        }
        default:
            return state;
    }
};


export const getCardsAC = (cards: CardsResponseType) => ({
    type: 'CARDS/GET-CARDS',
    cards
} as const);


export const AddCardsAC = (cards: CardsResponseType) => ({
    type: 'CARDS/ADD-CARDS',
    cards
} as const);

export const setCardsCurrentPageAC = (page: number) =>
    ({type: 'CARDS/SET-CARDS-CURRENT-PAGE', page} as const)
export const setCardsPageCountAC = (pageCount: number) =>
    ({type: 'CARDS/SET-CARDS-PAGE-COUNT', pageCount} as const)

export type GetCardsActionType = ReturnType<typeof getCardsAC>
export type AddCardsActionType = ReturnType<typeof AddCardsAC>

type ActionsType =
    GetCardsActionType
    | ReturnType<typeof setCardsCurrentPageAC>
    | ReturnType<typeof setCardsPageCountAC>


// thunk

export const getCardsTC = (payload: CardsType) => (dispatch: Dispatch, getState: () => IAppStore) => {
    const {
        page,
        pageCount,
    } = getState().cardsReducer;

    cardsApi.getCards({
        page,
        pageCount,
        ...payload
    })
        .then((res) => {
            dispatch(getCardsAC(res.data))
        })
        .catch((err) => {
            alert('No cards, error')
        })
}

export const sendCardTC = (payload: CardRequestType, cardsPack_id: string): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch) => {
    cardsApi.sendCard({...payload})
        .then((res) => {
            dispatch(getCardsTC({cardsPack_id}))
        })
}


export const deleteCardTC = (id: string, cardsPack_id: string): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch) => {

    cardsApi.deleteCard(id)
        .then((res) => {
            dispatch(getCardsTC({cardsPack_id}))
        })
}

export const updateCardTC = (cardsPack_id: string, payload: UpdatePacksType): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch) => {
    cardsApi.updateCard(payload)
        .then((res) => {
            dispatch(getCardsTC({cardsPack_id}))
        })
}























