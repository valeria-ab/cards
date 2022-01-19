
import {instance} from './api';


// types
//request to server
export type CardsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}


export type CardRequestType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type?: string
}

export type UpdateCardType = {
    _id: string
    question?: string
    answer?: string
    shots?: number
    rating?: number
    grade?: number
    // url or base64
    answerImg?: string
    // url or base64
    questionImg?: string
    // url or base64
    questionVideo?: string
    // url or base64
    answerVideo?: string
    type?: string
    comments?: string
}


// response form

export type CardResponseType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}

export type CardsResponseType = {
    cards: CardResponseType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}


export const cardsApi = {
    getCards(payload = {} as CardsType) {
        return instance.get<CardsResponseType>("cards/card", {
            params: {
                ...payload,
            },
        });
    },
    sendCard(payload = {} as CardRequestType) {
        return instance.post("cards/card", {
            card: {
                ...payload,
            },
        });
    },
    deleteCard(id: string) {
        return instance.delete(`cards/card?id=${id}`);
    },
    updateCard(payload = {} as UpdateCardType) {
        return instance.put(`cards/card`, {
            card: {
                ...payload,
            },
        });
    },
}