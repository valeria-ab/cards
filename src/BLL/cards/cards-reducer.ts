import {AnyAction, Dispatch} from "redux";
import {
    CardRequestType,
    CardResponseType,
    cardsApi,
    CardsResponseType,
    CardsType
} from "../../DAL/CardsAPI";
import {ThunkAction} from "redux-thunk";
import {IAppStore} from "../store/store";
import {UpdatePacksType} from "../../DAL/Packs-api";
import {setCardsPacksCountAC} from '../packs/ActionCreators';

export type InitialStateType = {
    cards: CardResponseType[],
    cardsTotalCount: number | null
    maxGrade: number
    minGrade: number
    page: number | null
    pageCount: number | null
    packUserId: string | null

}

const initialState: InitialStateType = {
    cards: [],
    cardsTotalCount: null,
    maxGrade: 100,
    minGrade: 10,
    page: null,
    pageCount: null,
    packUserId: null,
};

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "CARDS/GET-CARDS": {
            return {...state, ...action.cards}
        }
        case 'CARDS/SET-CARDS-PACKS-COUNT': {
            return {...state,  maxGrade: action.max, minGrade: action.min}
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


export type GetCardsActionType = ReturnType<typeof getCardsAC>
export type AddCardsActionType = ReturnType<typeof AddCardsAC>

type ActionsType = GetCardsActionType | ReturnType<typeof setCardsPacksCountAC>


// thunk

export const getCardsTC = (payload: CardsType) => (dispatch: Dispatch) => {

    cardsApi.getCards({...payload})
        .then((res) => {
            dispatch(getCardsAC(res.data))
        })
        .catch((err) => {
            alert("No cards, error")
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























