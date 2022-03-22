import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {SortingItem} from './SortingItem';
import {setCardsPacksCountFromRangeAC, setSortPacksValueAC} from '../../../BLL/packs/packs-reducer';
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
        <div style={{margin: '0 auto'}}>
            <span>Sort by</span>
            <div style={{
                display: "flex",
            flexDirection: "column",
                justifyContent: "space-around",
                height: "150px",
                marginTop: '10px',

                alignItems: "center"
            }}>


                <SortingItem isArrowUp={isNameArrowUp}
                             setArrowUp={setNameArrowUp}
                             dispatch={dispatch}
                             title={'Name'}
                             setSortPacksValues={['0name', '1name']}
                             sortBy={sortBy}
                             position={{top: '74%'}}
                />

                <SortingItem isArrowUp={isCardsArrowUp}
                             setArrowUp={setCardsArrowUp}
                             dispatch={dispatch}
                             title={'Cards amount'}
                             setSortPacksValues={['0cardsCount', '1cardsCount']}
                             sortBy={sortBy}
                             position={{top: '80%'}}
                />

                <SortingItem isArrowUp={isLastUpdatedArrowUp}
                             setArrowUp={setLastUpdatedArrowUp}
                             dispatch={dispatch}
                             title={'Update date'}
                             setSortPacksValues={['0updated', '1updated']}
                             sortBy={sortBy}
                             position={{top: '85%'}}
                />
                <div
                    className={s.resetSortingFilter}
                    onClick={() => dispatch(setSortPacksValueAC(""))}
                >reset sorting filter</div>
            </div>
        </div>
    )

})