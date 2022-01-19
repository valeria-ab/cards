import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';
import { setMaxCardsCount, setMinCardsCount} from '../../../BLL/packs/ActionCreators';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {setCardsPacksCountAC} from '../../../BLL/findAndPagination/findAndPaginationReducer';
import RangeSlider from './Range2';

function valuetext(value: number) {
    return `${value}°C`;
}

export function RangeSliderr() {
    const dispatch = useDispatch()
    const packs = useSelector((store: IAppStore) => store.packs);
    const min = packs.minCardsCount
    const max = packs.maxCardsCount

    const handleChange = (event: Event, newValue: number | number[]) => {
       dispatch(setCardsPacksCountAC(newValue as number[]))

    };

    return (<div>

        <span>Number of cards</span>
        <Box sx={{width: 200}}>
            <Slider
                getAriaLabel={() => 'Number of cards'}
                value={[min, max]}
                onChange={handleChange}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
                min={0}
                max={200}
            />
        </Box>
    </div>);
}


export const CardsRange = () => {
    const packs = useSelector((store: IAppStore) => store.packs);
    const [values, setValues] = useState([packs.minCardsCount, packs.maxCardsCount]);
    const dispatch = useDispatch();
    const setGlobalValues = (newValues: number[]) => {
        dispatch(setMinCardsCount(newValues[0]));
        dispatch(setMaxCardsCount(newValues[1]));
        setValues(newValues);
    };
    useEffect(() => {
        setGlobalValues([packs.minCardsCount, packs.maxCardsCount]);
    }, [packs.minCardsCount, packs.maxCardsCount]);
    return <div>


        <RangeSlider/>
    </div>
}