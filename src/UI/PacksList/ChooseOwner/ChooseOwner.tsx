import {setCardsPacksCountFromRangeAC, setSortPacksValueAC, setWithMyIdAC} from '../../../BLL/packs/packs-reducer';
import {useDispatch, useSelector} from 'react-redux';
import s from './ChooseOwner.module.scss';
import {IAppStore} from '../../../BLL/store/store';
import {changeLayoutAC} from '../../../BLL/cards/cards-reducer';
import React from 'react';

export const ChooseOwner = React.memo(() => {
    const dispatch = useDispatch()
    const withMyId = useSelector<IAppStore, boolean>(state => state.packs.withMyId)

    return <div className={s.ChooseOwner}>
        <div className={s.Choose__text}><b>Show packs cards</b></div>
        <button className={
            withMyId
                ? `${s.active} ${s.Choose__button}`
                :  s.Choose__button
        }
                onClick={() => {
                    dispatch(setWithMyIdAC(true))
                    dispatch(setCardsPacksCountFromRangeAC([0,1000]))
                    // dispatch(changeLayoutAC("profile"))
                    dispatch(setSortPacksValueAC(""))
                }
                }>My
        </button>
        <button className={
            !withMyId
                ? `${s.active} ${s.Choose__button}`
                :  s.Choose__button
        }
                onClick={() => {
                    dispatch(setWithMyIdAC(false))
                    dispatch(setCardsPacksCountFromRangeAC([0,1000]))
                    // dispatch(changeLayoutAC("packs-list"))
                    dispatch(setSortPacksValueAC(""))
                }}>All
        </button>
    </div>
})