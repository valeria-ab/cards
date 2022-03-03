import {instance} from './api';

// types
// response form server
export type PacksResponseType = {

    cardPacks: CardPacksType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type CardPacksType = {
    _id: string
    user_id: string
    user_name: string
    name: string
    path: string
    cardsCount: number
    grade: number
    shots: number
    rating: number
    private: false
    type: string
    created: string
    updated: string
    __v: number
}

export type CreatePacksType = {
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
}

export type UpdatePacksType = {
    _id: string
    name: string
}

export type SortingPacksType = "0cardsCount" | "1cardsCount" | "0name" | "1name" | "0updated" | "1updated"

//request to server
export type PacksType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: SortingPacksType
    page?: number
    pageCount?: number
    user_id?: string
}

export type CreatePacksResponseType = {
    newCardsPack: {}
}


export type UpdatePacksResponseType = {
    updatedCardsPack:{}
}



export const packsApi = {
    getPacks(payload = {} as PacksType) { // промис со всеми паками
        return instance.get<PacksResponseType>("cards/pack", {
            params: {
                ...payload,
            },
        });
    },
    createPack(payload = {} as CreatePacksType) {
        return instance.post<CreatePacksResponseType>("cards/pack", {
            cardsPack:{...payload}
        });
    },
    deletePack(packID: string) {
        return instance.delete(`cards/pack?id=${packID}`,
        );
    },
    updatePack(payload:UpdatePacksType) {
        return instance.put(`cards/pack`,{cardsPack:{...payload}});
    },
};