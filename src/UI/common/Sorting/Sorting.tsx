import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {SortingItem} from './SortingItem';
import { setSortPacksValueAC} from '../../../BLL/packs/packs-reducer';
import {IAppStore} from '../../../BLL/store/store';
import {SortingPacksType} from '../../../DAL/packs-api';
import s from './Sorting.module.css';

export const Sorting = React.memo(() => {
    const dispatch = useDispatch()
    const [isNameArrowUp, setNameArrowUp] = useState<boolean>(false);
    const [isCardsArrowUp, setCardsArrowUp] = useState<boolean>(false);
    const [isLastUpdatedArrowUp, setLastUpdatedArrowUp] = useState<boolean>(false);
    const sortBy = useSelector<IAppStore, "" | SortingPacksType>(state => state.packs.sortingBy)

    useEffect(() => {
        return () => {
            dispatch(setSortPacksValueAC(""))
        }
    }, [])

    return (
        <div className={s.sortingPage}>
            <span>Sort by</span>
            <div className={s.sortingItemsWrapper}>


                <SortingItem isArrowUp={isNameArrowUp}
                             setArrowUp={setNameArrowUp}
                             dispatch={dispatch}
                             title={'Name'}
                             setSortPacksValues={['0name', '1name']}
                             sortBy={sortBy}
                />

                <SortingItem isArrowUp={isCardsArrowUp}
                             setArrowUp={setCardsArrowUp}
                             dispatch={dispatch}
                             title={'Cards amount'}
                             setSortPacksValues={['0cardsCount', '1cardsCount']}
                             sortBy={sortBy}
                />

                <SortingItem isArrowUp={isLastUpdatedArrowUp}
                             setArrowUp={setLastUpdatedArrowUp}
                             dispatch={dispatch}
                             title={'Update date'}
                             setSortPacksValues={['0updated', '1updated']}
                             sortBy={sortBy}
                />
                <div
                    className={s.resetSortingFilter}
                    onClick={() => dispatch(setSortPacksValueAC(""))}
                >reset sorting filter</div>
            </div>
        </div>
    )

})