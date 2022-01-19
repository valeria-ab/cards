import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {styled} from '@mui/material/styles';
import {useDispatch, useSelector} from "react-redux";
import {IAppStore} from '../../../BLL/store/store';
import {setCardsPacksCountAC} from '../../../BLL/findAndPagination/findAndPaginationReducer';
import {getPacksTC} from '../../../BLL/packs/packs-reducer';
// цвет шрифта пагинации темный
export const paginationTextColorDark = "#2D2E46";
// цвет slider
export const sliderColor =  "#21268F"
// цвет шрифта slider
export const sliderTextColor = "#FFFFFF";
const MySlider = styled(Slider)({
    color: sliderColor,
    height: 5,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 16,
        width: 16,
        backgroundColor: sliderTextColor,
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
        backgroundColor: sliderColor,
        '&:before': { display: 'none' },
    },
});

export default function RangeSlider() {
    const dispatch = useDispatch()

    const handleChange = (event: Event, newValue: number | number[]) => {
        dispatch(setCardsPacksCountAC(newValue as number[]))
    };
    const cards = useSelector((store: IAppStore) => store.cardsReducer);
    const min = cards.minGrade
    const max = cards.maxGrade

    return (
        <Box sx={{ width: 195 }}>
            <MySlider
                getAriaLabel={() => 'Number of cards'}
                value={[min, max]}
                onChange={handleChange}
                onChangeCommitted={() => {dispatch(getPacksTC())}}
                valueLabelDisplay="on"
                min={0}
                max={200}
            />
        </Box>
    );
}


