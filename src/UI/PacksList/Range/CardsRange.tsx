import React, {useEffect, useState} from 'react';
import {getTrackBackground, Range} from 'react-range';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';
import {setMaxCardsCount, setMinCardsCount} from '../../../BLL/packs/ActionCreators';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
    return `${value}°C`;
}

export  function RangeSlider() {
    const dispatch = useDispatch()
    const packs = useSelector((store: IAppStore) => store.packs);
    const min = packs.minCardsCount
    const max = packs.maxCardsCount

    const handleChange = (event: Event, newValue: number | number[]) => {
        // dispatch(setCardsPacksCountAC(newValue as number[]))
    };

    return (
        <Box sx={{ width: 200 }}>
            <Slider
                getAriaLabel={() => 'Number of cards'}
                value={[min, max]}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={0}
                max={200}
            />
        </Box>
    );
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
        <span>0</span>
        <input
            type={'range'}
        />
        <span>1000</span>


        {/*<Range values={values}*/}
        {/*       onChange={values => setGlobalValues(values)}*/}
        {/*       renderTrack={*/}
        {/*           ({props, children}) => (*/}
        {/*               <div*/}
        {/*                   onMouseDown={props.onMouseDown}*/}
        {/*                   onTouchStart={props.onTouchStart}*/}
        {/*               >*/}
        {/*                   <div*/}
        {/*                       ref={props.ref}*/}
        {/*                   >*/}
        {/*                       {children}*/}
        {/*                   </div>*/}
        {/*               </div>*/}
        {/*           )}*/}

        {/*       renderThumb={({index, props, isDragged}) => (*/}
        {/*           <div*/}
        {/*               {...props}*/}
        {/*           >*/}
        {/*               {values[index].toFixed(0)}*/}
        {/*           </div>*/}
        {/*       )}/>*/}

        {/*<Range values={values}*/}
        {/*       onChange={values => setGlobalValues(values)}*/}
        {/*       renderTrack={({props, children}) => (*/}
        {/*           <div*/}
        {/*               onMouseDown={props.onMouseDown}*/}
        {/*               onTouchStart={props.onTouchStart}*/}
        {/*               style={{*/}
        {/*                   ...props.style,*/}
        {/*                   height: '36px',*/}
        {/*                   display: 'flex',*/}
        {/*                   width: '50%',*/}
        {/*                   margin: '30px',*/}
        {/*               }}*/}
        {/*           >*/}
        {/*               <div*/}
        {/*                   ref={props.ref}*/}
        {/*                   style={{*/}
        {/*                       height: '5px',*/}
        {/*                       width: '100%',*/}
        {/*                       borderRadius: '4px',*/}
        {/*                       background: getTrackBackground({*/}
        {/*                           values: values,*/}
        {/*                           colors: ['#ccc', '#548BF4', '#ccc'],*/}
        {/*                           min: packs.minCardsCount,*/}
        {/*                           max: packs.maxCardsCount*/}
        {/*                       }),*/}
        {/*                       alignSelf: 'center'*/}
        {/*                   }}*/}
        {/*               >*/}
        {/*                   {children}*/}
        {/*               </div>*/}
        {/*           </div>*/}
        {/*       )}*/}
        {/*       renderThumb={({index, props, isDragged}) => (*/}
        {/*           <div*/}
        {/*               {...props}*/}
        {/*               style={{*/}
        {/*                   ...props.style,*/}
        {/*                   height: '12px',*/}
        {/*                   width: '12px',*/}
        {/*                   borderRadius: '1px',*/}
        {/*                   backgroundColor: '#FFF',*/}

        {/*                   boxShadow: '0px 2px 6px #AAA',*/}
        {/*               }}*/}
        {/*           >*/}
        {/*               <div*/}
        {/*                   style={{*/}
        {/*                       position: 'absolute',*/}
        {/*                       top: '-28px',*/}
        {/*                       color: '#fff',*/}
        {/*                       fontWeight: 'bold',*/}
        {/*                       fontSize: '14px',*/}
        {/*                       fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',*/}
        {/*                       padding: '4px',*/}
        {/*                       borderRadius: '4px',*/}
        {/*                       backgroundColor: '#548BF4'*/}
        {/*                   }}*/}
        {/*               >*/}
        {/*                   {values[index].toFixed(0)}*/}

        {/*               </div>*/}
        {/*               <div style={{height: '16px', width: '5px', backgroundColor: isDragged ? '#548BF4' : '#CCC'}}/>*/}
        {/*           </div>*/}
        {/*       )}*/}
        {/*       />*/}
<RangeSlider />
    </div>
}