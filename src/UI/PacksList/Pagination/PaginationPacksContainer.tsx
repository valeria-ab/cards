import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "./Pagination";
import {IAppStore} from '../../../BLL/store/store';
import {getPacksTC, setCardPacksCurrentPageAC, setCardPacksPageCountAC} from '../../../BLL/packs/packs-reducer';

export const PaginationPacksContainer = () => {
    const dispatch = useDispatch()


    const pageCount = useSelector<IAppStore, number>(state => state.packs.pageCount)

    const cardPacksTotalCount = useSelector<IAppStore, number>(state => state.packs.cardPacksTotalCount)

    const page = useSelector<IAppStore, number>(state => state.packs.page)

    const currentPageHandler = (page: number) => {
        dispatch(setCardPacksCurrentPageAC(page))
        dispatch(getPacksTC())
    }

    const arr = ['5', '10', '20', '50', '100'] // for SuperSelect

    const [valueForSelect, onChangeOption] = useState(arr[1]) // for SuperSelect

    const onClickSelectHandler = () => {
        dispatch(setCardPacksPageCountAC(+valueForSelect))
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