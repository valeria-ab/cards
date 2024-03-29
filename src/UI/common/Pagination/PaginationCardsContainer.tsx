import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Pagination} from './Pagination';
import {IAppStore} from '../../../BLL/store/store';
import {setCardsCurrentPageAC, setCardsPageCountAC} from '../../../BLL/cards/cards-reducer';

export const PaginationCardsContainer = React.memo(() => {
    const dispatch = useDispatch()
    let pageCount = useSelector<IAppStore, number>(state => state.cards.pageCount)
    let cardPacksTotalCount = useSelector<IAppStore, number>(state => state.cards.cardsTotalCount)
    let page = useSelector<IAppStore, number>(state => state.cards.page)


    const currentPageHandler = useCallback((page: number) => {
        dispatch(setCardsCurrentPageAC(page))
    }, [])

    const onChangeOption = useCallback((value: number) => {
        dispatch(setCardsPageCountAC(value))
    }, [])


    return <Pagination
        cardPacksTotalCount={cardPacksTotalCount}
        pageCount={pageCount}
        onChangeOption={onChangeOption}
        page={page}
        currentPageHandler={currentPageHandler}
    />
})