import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "./Pagination";
import {IAppStore} from '../../../BLL/store/store';
import {setCardsCurrentPageAC, setCardsPageCountAC} from '../../../BLL/cards/cards-reducer';

export const PaginationCardsContainer = () => {
    const dispatch = useDispatch()

    let pageCount = useSelector<IAppStore, number>(state => state.cards.pageCount)

    let cardPacksTotalCount = useSelector<IAppStore, number>(state => state.cards.cardsTotalCount)
    // selected page
    let page = useSelector<IAppStore, number>(state => state.cards.page)


    const currentPageHandler = (page: number) => {
        dispatch(setCardsCurrentPageAC(page))
    }

    const arr = ['5', '10', '20', '50', '100'] // for Select

    const [valueForSelect, setValueForSelect] = useState(arr[1]) // for Select

    const onChangeOption = (value: string) => {
        setValueForSelect(value)
        dispatch(setCardsPageCountAC(+value))
    }

    const onClickSelectHandler = () => {
        dispatch(setCardsPageCountAC(+valueForSelect))
    }

    return <Pagination
        cardPacksTotalCount={cardPacksTotalCount}
        pageCount={pageCount}
        onClickSelectHandler={onClickSelectHandler}
        select={{
            valueForSelect,
            onChangeOption,
            arr
        }}
        page = {page}
        currentPageHandler={currentPageHandler}
    />
}