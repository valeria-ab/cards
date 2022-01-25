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
import {setErrorAC, SetErrorActionType} from "../Error/errorReducer";
import {GradeType, rateAPI} from '../../DAL/rateAPI';

export type InitialStateType = {
    cards: CardResponseType[],
    cardsTotalCount: number
    maxGrade: number | null
    minGrade: number | null
    page: number
    pageCount: number
    packUserId: string | null
    myCurrentGrade: GradeType
}

const initialState: InitialStateType = {
    cards: [],
    cardsTotalCount: 10,
    maxGrade: null,
    minGrade: null,
    page: 1,
    pageCount: 10,
    packUserId: null,
    myCurrentGrade: 1

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
        case 'CARDS/SET-MY-CURRENT-GRADE': {
            return {...state, myCurrentGrade: action.value}
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
export const setMyCurrentGradeAC = (value: GradeType) =>
    ({type: 'CARDS/SET-MY-CURRENT-GRADE', value} as const)

export type GetCardsActionType = ReturnType<typeof getCardsAC>
export type AddCardsActionType = ReturnType<typeof AddCardsAC>

type ActionsType =
    GetCardsActionType
    | ReturnType<typeof setCardsCurrentPageAC>
    | ReturnType<typeof setCardsPageCountAC>
    | ReturnType<typeof setMyCurrentGradeAC>
    | SetErrorActionType


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
            dispatch(setErrorAC(err))
        })
}

export const sendCardTC = (payload: CardRequestType, cardsPack_id: string): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch) => {
    cardsApi.sendCard({...payload})
        .then((res) => {
            dispatch(getCardsTC({cardsPack_id}))
        })
        .catch((err) => {
            dispatch(setErrorAC(err))
        })
}


export const deleteCardTC = (id: string, cardsPack_id: string): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch) => {

    cardsApi.deleteCard(id)
        .then((res) => {
            dispatch(getCardsTC({cardsPack_id}))
        })
        .catch((err) => {
            dispatch(setErrorAC(err))
        })
}

export const updateCardTC = (cardsPack_id: string, payload: UpdatePacksType): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch) => {
    cardsApi.updateCard(payload)
        .then((res) => {
            dispatch(getCardsTC({cardsPack_id}))
        })
        .catch((err) => {
            dispatch(setErrorAC(err))
        })
}


export const sendCardGradeTC = (grade: GradeType, card_id: string): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch) => {
    rateAPI.updateGrade(grade, card_id)
        .then((res) => {
            dispatch(setMyCurrentGradeAC(res.data.grade))
        })
        .catch((err) => {
            dispatch(setErrorAC(err))
        })
}




















