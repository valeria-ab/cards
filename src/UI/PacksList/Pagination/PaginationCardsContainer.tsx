import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "./Pagination";
import {IAppStore} from '../../../BLL/store/store';
import {setCardsCurrentPageAC, setCardsPageCountAC} from '../../../BLL/findAndPagination/findAndPaginationReducer';

export const PaginationCardsContainer = () => {
    const dispatch = useDispatch()

    // count of elements at one page
    let pageCount = useSelector<IAppStore, number>(state => state.findAndPagination.cards.pageCount)
    // count of OldCards
    let cardPacksTotalCount = useSelector<IAppStore, number>(state => state.findAndPagination.cards.totalCount)
    // selected page
    let page = useSelector<IAppStore, number>(state => state.findAndPagination.cards.page)

    const currentPageHandler = (page: number) => {
        dispatch(setCardsCurrentPageAC(page))
    }

    const arr = ['5', '10', '20', '50', '100'] // for SuperSelect

    const [valueForSsSr, onChangeOption] = useState(arr[1]) // for SuperSelect

    const onClickSelectHandler = () => {
        dispatch(setCardsPageCountAC(+valueForSsSr))
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