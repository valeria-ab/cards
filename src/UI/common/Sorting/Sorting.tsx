import {useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {SortingItem} from './SortingItem';
import {setCardsPacksCountFromRangeAC, setSortPacksValueAC} from '../../../BLL/packs/packs-reducer';

export const Sorting = React.memo(() => {
    const dispatch = useDispatch()
    const [isNameArrowUp, setNameArrowUp] = useState<boolean>(false);
    const [isCardsArrowUp, setCardsArrowUp] = useState<boolean>(false);
    const [isLastUpdatedArrowUp, setLastUpdatedArrowUp] = useState<boolean>(false);

    useEffect(() => {
        return () => {
            dispatch(setSortPacksValueAC(null))
        }
    }, [])

    return (
        <div>
            <span>Sorting by</span>

            <SortingItem isArrowUp={isNameArrowUp}
                         setArrowUp={setNameArrowUp}
                         dispatch={dispatch}
                         title={'Name'}
                         setSortPacksValues={['0name', '1name']}
            />

            <SortingItem isArrowUp={isCardsArrowUp}
                         setArrowUp={setCardsArrowUp}
                         dispatch={dispatch}
                         title={'Cards amount'}
                         setSortPacksValues={['0cardsCount', '1cardsCount']}
            />

            <SortingItem isArrowUp={isLastUpdatedArrowUp}
                         setArrowUp={setLastUpdatedArrowUp}
                         dispatch={dispatch}
                         title={'Date of updating'}
                         setSortPacksValues={['0updated', '1updated']}
            />

        </div>
    )

})