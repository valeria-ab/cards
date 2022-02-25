import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Pagination} from './Pagination';
import {IAppStore} from '../../../BLL/store/store';
import {setCardPacksCurrentPageAC, setCardPacksPageCountAC} from '../../../BLL/packs/packs-reducer';

export const PaginationPacksContainer = () => {
    const dispatch = useDispatch()
    const pageCount = useSelector<IAppStore, number>(state => state.packs.pageCount)
    const cardPacksTotalCount = useSelector<IAppStore, number>(state => state.packs.cardPacksTotalCount)
    const page = useSelector<IAppStore, number>(state => state.packs.page)

    const currentPageHandler = (page: number) => {
        dispatch(setCardPacksCurrentPageAC(page))
    }

    const onChangeOption = (value: number) => {
        dispatch(setCardPacksPageCountAC(value))
    }

    return <Pagination
        cardPacksTotalCount={cardPacksTotalCount}
        pageCount={pageCount}
        onChangeOption={onChangeOption}
        page={page}
        currentPageHandler={currentPageHandler}
    />
}