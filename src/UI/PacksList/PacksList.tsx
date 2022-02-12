import {Table} from '../Table/Table';
import {Cards} from '../Cards/Cards';
import React, {useEffect, useState} from 'react';
import {ChooseOwner} from './ChooseOwner/ChooseOwner';
import RangeSlider from '../PacksList/Range/RangeSlider';
import s from '../Profile/ProfilePage.module.scss';
import {getPacksTC, setWithMyIdAC} from '../../BLL/packs/packs-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../BLL/store/store';
import {checkAuthMe} from '../../BLL/login/loginThunk';
import {Navigate} from 'react-router-dom';


export const PacksList = () => {
    const dispatch = useDispatch()
    const isInitialized = useSelector<IAppStore, boolean>((state) => state.app.isInitialized);
    const withMyId = useSelector<IAppStore, boolean>(state => state.packs.withMyId)
    const page = useSelector<IAppStore, number>(state => state.packs.page)
    const pageCount = useSelector<IAppStore, number>(state => state.packs.pageCount)
    const id = useSelector<IAppStore, string>((state) => state.profile._id);

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

    useEffect(() => {
        withMyId
            ? dispatch(getPacksTC({user_id: id}))
            : dispatch(getPacksTC())
    }, [withMyId, page, pageCount])

    if (!isInitialized) {
        return <Navigate to={'/login'}/>;
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
                    ? <Table onClickCardsHandler={onClickCardsHandler}/>
                    : <Cards id={packID}
                             tableOffHandler={tableOffHandler}
                             cardsModeOff={cardsModeOff}/>}
            </div>

        </div>
    </div>

}
