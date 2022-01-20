
import Search from './Search/Search';
import {ChooseOwner} from './ChooseOwner/ChooseOwner';
import {Pagination} from './Pagination/Pagination';
import {Table} from '../Table/Table';
import RangeSlider from './Range/RangeSlider';
import {Cards} from '../Cards/Cards';
import React, {useState} from 'react';


export const PacksList = () => {
    const [tableOff, setTableOff] = useState<boolean>(true);
    const onClickCardsHandler = (id: string) => {
        setTableOff(false)
        setPackID(id)
    }
    const [packID, setPackID] = useState<string>('');
    const tableOffHandler = () => {
        setTableOff(false)

    }
    const cardsModeOff = () => {
        setTableOff(true)
    }
    return <div>
        {tableOff
            ? <Table onClickCardsHandler={onClickCardsHandler}/>
            : <Cards id={packID}
                     tableOffHandler={tableOffHandler}
                     cardsModeOff={cardsModeOff}/>}

    </div>
}