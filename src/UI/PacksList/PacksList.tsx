import {Table} from '../Table/Table';
import {Cards} from '../Cards/Cards';
import React, {useState} from 'react';
import {RateYourself} from '../Rate/RateYourself';


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

        <RateYourself/>

    </div>
}