import * as React from 'react';
import {setCardsPacksCountFromRangeAC} from '../../../BLL/packs/packs-reducer';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RangeSlider} from './RangeSlider';
import {IAppStore} from '../../../BLL/store/store';


export const RangeSliderContainer = React.memo(() => {
    const dispatch = useDispatch()
    const maxCardsCount = useSelector<IAppStore, number>(state => state.packs.maxCardsCount)
    const minCardsCount = useSelector<IAppStore, number>(state => state.packs.minCardsCount)


    const onChangeCommitted = useCallback((values: number[]) => {
        dispatch(setCardsPacksCountFromRangeAC(values))
    }, [dispatch])

    return (<RangeSlider
            onChangeCommitted={onChangeCommitted}
            maxCardsCount={maxCardsCount}
            minCardsCount={minCardsCount}
        />
    );
})


