import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "./Pagination";
import {IAppStore} from '../../../BLL/store/store';
import {getCardsTC, setCardsCurrentPageAC, setCardsPageCountAC} from '../../../BLL/cards/cards-reducer';

export const PaginationCardsContainer = (props: {id: string}) => {
    const dispatch = useDispatch()

    let pageCount = useSelector<IAppStore, number>(state => state.cards.pageCount)

    let cardPacksTotalCount = useSelector<IAppStore, number>(state => state.cards.cardsTotalCount)
    // selected page
    let page = useSelector<IAppStore, number>(state => state.cards.page)


    const currentPageHandler = (page: number) => {
        dispatch(setCardsCurrentPageAC(page))
       dispatch(getCardsTC({cardsPack_id: props.id}))
    }

    const arr = ['5', '10', '20', '50', '100'] // for Select

    const [valueForSelect, onChangeOption] = useState(arr[1]) // for Select

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