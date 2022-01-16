import axios from "axios";

const instance = axios.create({
    //baseURL: "http://localhost:7542/2.0/",
   baseURL: "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true,
});

// types
// response form server
export type PacksResponseType = {

    cardPacks: cardPacksType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type cardPacksType = {
    _id: string
    user_id: string
    name: string
    path: string
    cardsCount: number
    grade: number
    shots: number
    rating: number
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



//request to server
export type PacksType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
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