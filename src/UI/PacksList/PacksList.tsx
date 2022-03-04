import {Table} from '../Table/Table';
import {Cards} from '../Cards/Cards';
import React, {useEffect, useState} from 'react';
import {ChooseOwner} from './ChooseOwner/ChooseOwner';
import RangeSlider from '../PacksList/Range/RangeSlider';
import s from '../Profile/ProfilePage.module.css';
import {getPacksTC} from '../../BLL/packs/packs-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../BLL/store/store';
import {Navigate} from 'react-router-dom';
import {SortingPacksType} from '../../DAL/packs-api';
import {Sorting} from './Sorting/Sorting';


export const PacksList = (
    // props: { isTableMode: boolean }
) => {
    // console.log("я пакслист я отрисовался")
    const dispatch = useDispatch()
    const isInitialized = useSelector<IAppStore, boolean>((state) => state.app.isInitialized);
    const withMyId = useSelector<IAppStore, boolean>(state => state.packs.withMyId)
    const page = useSelector<IAppStore, number>(state => state.packs.page)
    const sortingBy = useSelector<IAppStore, SortingPacksType | null>(state => state.packs.sortingBy)
    const packName = useSelector<IAppStore, string>(state => state.packs.packName)
    const pageCount = useSelector<IAppStore, number>(state => state.packs.pageCount)
    const cardsValuesFromRange = useSelector<IAppStore, Array<number>>((state) => state.packs.cardsValuesFromRange);



    const refresh = async () => {
        await dispatch(getPacksTC())
    }

    useEffect(() => {
        dispatch(getPacksTC())
    }, [withMyId, page, pageCount, cardsValuesFromRange, packName, sortingBy])

    if (!isInitialized) {
        return <Navigate to={'/login'}/>;
    }



    return <div className={s.PacksList}>
        <div className={s.container}>
            <div className={s.profile__info}>
                <div className={s.profile__ChooseOwner}>
                    <ChooseOwner/>
                </div>
                <RangeSlider />
                <Sorting/>
            </div>
            <div className={s.profile__main}>
                {/*{props.isTableMode && <Table/>}*/}
                <Table/>
            </div>
        </div>
    </div>

}
