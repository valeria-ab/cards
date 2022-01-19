import {cardPacksType, packsApi, PacksResponseType, PacksType} from "../../DAL/Packs-api";
import {AnyAction, Dispatch} from "redux";
import {IAppStore} from "../store/store";
import {ThunkAction} from "redux-thunk";


export type InitialStateType = {

    cardPacks: cardPacksType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number


}

const initialState: InitialStateType = {
    cardPacks: [] as cardPacksType[],
    cardPacksTotalCount: 1,
    maxCardsCount: Infinity as number,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
};

export const packsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "PACKS/GET-PACKS": {
            return {...state, ...action.payload}
        }

        default:
            return state;
    }
};


export const GetPacksAC = (payload: PacksResponseType) => ({
    type: 'PACKS/GET-PACKS',
    payload
} as const);


export type GetPacksActionType = ReturnType<typeof GetPacksAC>


type ActionsType = GetPacksActionType


// thunk

export const getPacksTC = (payload?: PacksType) => (dispatch: Dispatch, getState: () => IAppStore) => {

    const {
        page,
        pageCount,
        maxCardsCount,
        minCardsCount,
    } = getState().packs;

    packsApi.getPacks({
        page,
        pageCount,
        min: minCardsCount,
        max: maxCardsCount,
        ...payload
    })
        .then((res) => {
            dispatch(GetPacksAC(res.data))
        })
}


export const createPacks = (name: string, user_id?: string): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch) => {
    packsApi.createPack({name})
        .then((res) => {
            dispatch(getPacksTC({user_id}))
        })
}


export const deletedPacks = (packID: string, user_id?: string): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch) => {
    packsApi.deletePack(packID)
        .then((res) => {
            dispatch(getPacksTC({user_id}))
        })

}


export const updatePacks = (payload: cardPacksType): ThunkAction<void, IAppStore, unknown, AnyAction> => (dispatch, getState: () => IAppStore) => {
    const pack = getState().packs.cardPacks.find((pack) => pack._id === payload._id)

    const updatePack = {...pack, ...payload};
    packsApi.updatePack(updatePack)
        .then((res) => {
            dispatch(getPacksTC({user_id: payload.user_id}))
        })
}







