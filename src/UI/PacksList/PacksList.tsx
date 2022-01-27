import { Table } from '../Table/Table';
import { Cards } from '../Cards/Cards';
import React, { useState } from 'react';
import { RateYourself } from '../Rate/RateYourself';
import { ChooseOwner } from "../PacksList/ChooseOwner/ChooseOwner";
import RangeSlider from "../PacksList/Range/RangeSlider";
import { setWithMyIdAC } from '../../BLL/packs/packs-reducer';
import s from '../Profile/ProfilePage.module.scss';


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
    return <div className={s.PacksList}>
        <div className={s.container}>
        <div className={s.profile__info}>
            <div className={s.profile__ChooseOwner}>
                <ChooseOwner />
            </div>
                <RangeSlider />
            </div>
            <div className={s.profile__main}>
                {tableOff
                    ? <Table onClickCardsHandler={onClickCardsHandler} />
                    : <Cards id={packID}
                        tableOffHandler={tableOffHandler}
                        cardsModeOff={cardsModeOff} />}
            </div>

        </div>
        <RateYourself />
    </div>

}