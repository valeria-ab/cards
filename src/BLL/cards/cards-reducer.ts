import {AnyAction, Dispatch} from 'redux';
import {
    CardRequestType,
    CardResponseType,
    cardsApi,
    CardsResponseType,
    CardsType
} from '../../DAL/cards-api';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {IAppStore} from '../store/store';
import {rateApi} from '../../DAL/rate-api';
import {setAppLoading, setErrorAC, SetErrorActionType} from '../app/app-reducer';
import {CardPacksType} from '../../DAL/packs-api';

export type InitialCardsStateType = {
    cards: CardResponseType[],
    cardsTotalCount: number
    maxGrade: number | null
    minGrade: number | null
    page: number
    pageCount: number
    packUserId: string | null
    myCurrentGrade: number
    layout: 'profile' | 'packs-list'
    currentPack: CardPacksType | null
    cardQuestion: string, //for search
}

const initialState: InitialCardsStateType = {
    cards: [],
    cardsTotalCount: 10,
    maxGrade: null,
    minGrade: null,
    page: 1,
    pageCount: 10,
    packUserId: null,
    myCurrentGrade: 1,
    layout: 'profile',
    currentPack: null,
    cardQuestion: '', //for search
};

export const cardsReducer = (state: InitialCardsStateType = initialState, action: ActionsType): InitialCardsStateType => {
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
        case 'CARDS/UPDATE-GRADE':
            return {
                ...state,
                cards: state.cards.map(card => card.cardsPack_id === action.id ? {...card, grade: action.grade} : card)
            }
        case 'CARDS/CHANGE-LAYOUT': {
            return {...state, layout: action.value}
        }
        case 'CARDS/SET-CURRENT-PACK': {
            return {...state, currentPack: action.value}
        }
        case 'CARDS/SET-SEARCH-QUESTION-NAME':
            return {...state, cardQuestion: action.cardQuestion}

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
export const setMyCurrentGradeAC = (value: number) =>
    ({type: 'CARDS/SET-MY-CURRENT-GRADE', value} as const)
export const updateGradeAC = (grade: number, id: string) => ({type: 'CARDS/UPDATE-GRADE', grade, id} as const)
export const changeLayoutAC = (value: 'profile' | 'packs-list') =>
    ({type: 'CARDS/CHANGE-LAYOUT', value} as const)
export const setCurrentPackAC = (value: CardPacksType) =>
    ({type: 'CARDS/SET-CURRENT-PACK', value} as const)
export const setSearchСardQuestionAC = (cardQuestion: string) =>
    ({type: 'CARDS/SET-SEARCH-QUESTION-NAME', cardQuestion} as const)

export type GetCardsActionType = ReturnType<typeof getCardsAC>
export type AddCardsActionType = ReturnType<typeof AddCardsAC>

type ActionsType =
    GetCardsActionType
    | ReturnType<typeof setCardsCurrentPageAC>
    | ReturnType<typeof setCardsPageCountAC>
    | ReturnType<typeof setMyCurrentGradeAC>
    | ReturnType<typeof updateGradeAC>
    | SetErrorActionType
    | ReturnType<typeof setAppLoading>
    | ReturnType<typeof changeLayoutAC>
    | ReturnType<typeof setCurrentPackAC>
    | ReturnType<typeof setSearchСardQuestionAC>

// thunk

export const getCardsTC = (payload: CardsType) => (dispatch: Dispatch, getState: () => IAppStore) => {
    const {
        page,
        pageCount,
        cardQuestion,
    } = getState().cards;
    dispatch(setAppLoading(true))
    cardsApi.getCards({
        page,
        pageCount,
        cardQuestion,
        ...payload
    })
        .then((res) => {
            dispatch(getCardsAC(res.data))
        })
        .catch((err) => {
            dispatch(setErrorAC(err))
        })
        .finally(() => dispatch(setAppLoading(false)))
}

export const sendCardTC = (payload: CardRequestType, cardsPack_id: string): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch) => {
    dispatch(setAppLoading(true))
    cardsApi.sendCard({...payload})
        .then((res) => {
            dispatch(getCardsTC({cardsPack_id}))
        })
        .catch((err) => {
            dispatch(setErrorAC(err))
        })
        .finally(() => dispatch(setAppLoading(false)))
}

export const createCardTC = (cardsPack_id: string, question: string, answer: string): ThunkAction<void, IAppStore, unknown, AnyAction> =>
    (dispatch) => {
        dispatch(setAppLoading(true))
        cardsApi.sendCard({
            cardsPack_id,
            question,
            answer
        })
            .then(() => {
                dispatch(getCardsTC({cardsPack_id}))
            })
            .catch((err) => {
                dispatch(setErrorAC(err))
            })
            .finally(() => dispatch(setAppLoading(false)))
    }


export const deleteCardTC = (id: string, cardsPack_id: string): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch) => {
    dispatch(setAppLoading(true))
    cardsApi.deleteCard(id)
        .then((res) => {
            dispatch(getCardsTC({cardsPack_id}))
        })
        .catch((err) => {
            dispatch(setErrorAC(err))
        })
        .finally(() => dispatch(setAppLoading(false)))
}

export const updateCardTC = (cardsPack_id: string, cardId: string, question: string, answer: string)
    : ThunkAction<void, IAppStore, unknown, AnyAction> =>
    (dispatch) => {
        dispatch(setAppLoading(true))
        cardsApi.updateCard({
            _id: cardId,
            question: question,
            answer: answer
        })
            .then((res) => {
                dispatch(getCardsTC({cardsPack_id}))
            })
            .catch((err) => {
                dispatch(setErrorAC(err))
            })
            .finally(() => dispatch(setAppLoading(false)))
    }

// export const sendCardGradeTC = (card_id: string): ThunkAction<void, IAppStore, unknown, AnyAction> =>
//     (dispatch: Dispatch, getState: () => IAppStore) => {
//     const {
//        myCurrentGrade
//     } = getState().cardsReducer;
//     rateAPI.updateGrade(myCurrentGrade, card_id)
//         .then((res) => {
//
//             dispatch(setMyCurrentGradeAC(res.data.grade))
//             console.log("success res.data.grade = " + res.data.grade)
//         })
//         .catch((err) => {
//             dispatch(setErrorAC(err))
//         })
// }

export const updateGradeTC = (card_id: string) =>
    (dispatch: Dispatch, getState: () => IAppStore) => {

        const {
            myCurrentGrade
        } = getState().cards

        dispatch(setAppLoading(true))

        rateApi.updateGrade(myCurrentGrade, card_id)
            .then((res) => {
                dispatch(updateGradeAC(myCurrentGrade, card_id))
            })
            .catch(e => {
                dispatch(setErrorAC(e.response.data.error))
            })
            .finally(() => dispatch(setAppLoading(false)))
    }



















