import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {styled} from '@mui/material/styles';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';
import {getPacksTC, setCardsPacksCountFromRangeAC} from '../../../BLL/packs/packs-reducer';
import s from './Range.module.css'


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
    const dispatch = useDispatch()

    const min = useSelector<IAppStore, number>(state => state.packs.cardsValuesFromRange[0])
    const max = useSelector<IAppStore, number>(state => state.packs.cardsValuesFromRange[1])
    const maxCardsCount = useSelector<IAppStore, number>(state => state.packs.maxCardsCount)
    const minCardsCount = useSelector<IAppStore, number>(state => state.packs.minCardsCount)

    const withMyId = useSelector<IAppStore, boolean>(
        (state) => state.packs.withMyId
    );
    const currentUserID = useSelector<IAppStore, string>((state) => state.profile._id);

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (maxCardsCount > 0) {
            dispatch(setCardsPacksCountFromRangeAC(newValue as number[]))
        }
    };


    return (<div className={s.range}>
            <Box sx={{width: 200}}>
                <div className={s.rangeTitle}><b>Number of cards</b></div>
                <CustomSlider
                    getAriaLabel={() => 'Number of cards'}
                    value={[min, max]}
                    onChange={handleChange}
                    onChangeCommitted={() => {
                        if (maxCardsCount > 0) {
                            dispatch(getPacksTC(withMyId
                                ? {user_id: currentUserID}
                                : {}))
                        }
                    }
                    }
                    valueLabelDisplay="on"
                    min={minCardsCount}
                    max={maxCardsCount}
                />
            </Box>
        </div>

    );
}


