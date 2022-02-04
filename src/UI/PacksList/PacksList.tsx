import {Table} from '../Table/Table';
import {Cards} from '../Cards/Cards';
import React, {useState} from 'react';
import {ChooseOwner} from './ChooseOwner/ChooseOwner';
import RangeSlider from '../PacksList/Range/RangeSlider';
import s from '../Profile/ProfilePage.module.scss';
import {Learn} from './Learn/Learn';


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
                    <ChooseOwner/>
                </div>
                <RangeSlider/>
            </div>
            <div className={s.profile__main}>
                {tableOff
                    ? <Table onClickCardsHandler={onClickCardsHandler} isfromProfile={false}/>
                    : <Cards id={packID}
                             tableOffHandler={tableOffHandler}
                             cardsModeOff={cardsModeOff}/>}
            </div>

        </div>
    </div>

}
