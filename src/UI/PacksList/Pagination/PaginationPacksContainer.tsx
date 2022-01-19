import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "./Pagination";
import {IAppStore} from '../../../BLL/store/store';
import {
    setCardPacksCurrentPageAC,
    setCardPacksPageCountAC
} from '../../../BLL/findAndPagination/findAndPaginationReducer';

export const PaginationPacksContainer = () => {
    const dispatch = useDispatch()

    // count of elements at one page
    let pageCount = useSelector<IAppStore, number>(state => state.findAndPagination.cardPacks.pageCount)
    // count of Card OldPacks
    let cardPacksTotalCount = useSelector<IAppStore, number>(state => state.findAndPagination.cardPacks.totalCount)
    // selected page
    let page = useSelector<IAppStore, number>(state => state.findAndPagination.cardPacks.page)

    const currentPageHandler = (page: number) => {
        dispatch(setCardPacksCurrentPageAC(page))
    }

    const arr = ['5', '10', '20', '50', '100'] // for SuperSelect

    const [valueForSsSr, onChangeOption] = useState(arr[1]) // for SuperSelect

    const onClickSelectHandler = () => {
        dispatch(setCardPacksPageCountAC(+valueForSsSr))
    }

    return <Pagination
        cardPacksTotalCount={cardPacksTotalCount}
        pageCount={pageCount}
        onClickSelectHandler={onClickSelectHandler}
        superSelect={{
            valueForSsSr,
            onChangeOption,
            arr
        }}
        page = {page}
        currentPageHandler={currentPageHandler}
    />
}