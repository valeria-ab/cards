import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {styled} from '@mui/material/styles';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';
import { setCardsPacksCountFromRangeAC} from '../../../BLL/packs/packs-reducer';
import s from './Range.module.css'
import {useEffect, useState} from 'react';


const CustomSlider = styled(Slider)({
    color: '#21268F',
    height: 5,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 16,
        width: 16,
        backgroundColor: '#FFFFFF',
        border: '4px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 24,
        borderRadius: 3,
        backgroundColor: '#21268F',
        '&:before': {display: 'none'},
    },
});

export default function RangeSlider() {
    // console.log("я слайдер я отрисовался")
    const dispatch = useDispatch()

    const maxCardsCount = useSelector<IAppStore, number>(state => state.packs.maxCardsCount)
    const minCardsCount = useSelector<IAppStore, number>(state => state.packs.minCardsCount)
    const [values, setValues] = useState<number[]>([minCardsCount, maxCardsCount])

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (maxCardsCount > 0) {
            setValues(newValue as number[])
        }
    };
    const onChangeCommitted = () => {
        if (maxCardsCount > 0) {   dispatch(setCardsPacksCountFromRangeAC(values))    }
    }

    useEffect(() => {
        setValues([0, 1000])
    }, [minCardsCount, maxCardsCount])

    return (<div className={s.range}>
            <Box sx={{width: 200}}>
                <div className={s.rangeTitle}><b>Number of cards</b></div>
                <CustomSlider
                    getAriaLabel={() => 'Number of cards'}
                    value={values}
                    onChange={handleChange}
                    onChangeCommitted={onChangeCommitted}
                    valueLabelDisplay="on"
                    min={minCardsCount}
                    max={maxCardsCount}
                />
            </Box>
        </div>

    );
}


