import { setWithMyIdAC} from '../../../BLL/packs/packs-reducer';
import {useDispatch} from 'react-redux';
import s from './ChooseOwner.module.scss';

export const ChooseOwner = () => {
    const dispatch = useDispatch()

    return <div className={s.ChooseOwner}>
        <div className={s.Choose__text}><b>Show packs cards</b></div>
        <button className={s.Choose__button} onClick={() => {
            dispatch(setWithMyIdAC(true))
        }
        }>My
        </button>
        <button  className={s.Choose__button} onClick={() => {
            dispatch(setWithMyIdAC(false))
        }}>All
        </button>
    </div>
}