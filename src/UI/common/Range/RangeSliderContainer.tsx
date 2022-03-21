import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {styled} from '@mui/material/styles';
import {setCardsPacksCountFromRangeAC} from '../../../BLL/packs/packs-reducer';
import s from './Range.module.css'
import {useCallback, useEffect, useState} from 'react';
import {Dispatch} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {RangeSlider} from './RangeSlider';
import {IAppStore} from '../../../BLL/store/store';


export const RangeSliderContainer = React.memo(() => {
    const dispatch = useDispatch()
    const maxCardsCount = useSelector<IAppStore, number>(state => state.packs.maxCardsCount)
    const minCardsCount = useSelector<IAppStore, number>(state => state.packs.minCardsCount)
    const cardsValuesFromRange = useSelector<IAppStore, number[]>(state => state.packs.cardsValuesFromRange)

    // const [values, setValues] = useState<number[]>([props.minCardsCount, props.maxCardsCount])

    // console.log("max min " + minCardsCount,  maxCardsCount)
    // console.log("cardsValuesFromRange " + cardsValuesFromRange)
    const onChangeCommitted = useCallback((values: number[]) => {
        dispatch(setCardsPacksCountFromRangeAC(values))

        // return () => {
        //     dispatch(setCardsPacksCountFromRangeAC([0, 1000]))
        // }
    }, [])

    useEffect(() => {
        return () => {dispatch(setCardsPacksCountFromRangeAC([0, 1000]))}
    }, [])

    return (<RangeSlider
            onChangeCommitted={onChangeCommitted}
            maxCardsCount={maxCardsCount}
            minCardsCount={minCardsCount}
        />
    );
})


