import {setCardsPacksCountFromRangeAC, setWithMyIdAC} from '../../../BLL/packs/packs-reducer';
import {useDispatch, useSelector} from 'react-redux';
import s from './ChooseOwner.module.scss';
import {IAppStore} from '../../../BLL/store/store';
import {changeLayoutAC} from '../../../BLL/cards/cards-reducer';

export const ChooseOwner = () => {
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
                    dispatch(changeLayoutAC("profile"))
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
                    dispatch(changeLayoutAC("packs-list"))
                }}>All
        </button>
    </div>
}