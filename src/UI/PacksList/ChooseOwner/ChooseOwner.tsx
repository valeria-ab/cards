import {setWithMyIdAC} from '../../../BLL/packs/packs-reducer';
import {useDispatch} from 'react-redux';
import s from './ChooseOwner.module.scss';
import {useState} from 'react';

export const ChooseOwner = () => {
    const [chosenButton, setChosenButton] = useState<'all' | 'my'>('all')
    const dispatch = useDispatch()

    return <div className={s.ChooseOwner}>
        <div className={s.Choose__text}><b>Show packs cards</b></div>
        <button className={
            chosenButton === 'my'
                ? `${s.active} ${s.Choose__button}`
                :  s.Choose__button
        }
                onClick={() => {
                    setChosenButton('my')
                    dispatch(setWithMyIdAC(true))
                }
                }>My
        </button>
        <button className={
            chosenButton === 'all'
                ? `${s.active} ${s.Choose__button}`
                :  s.Choose__button
        }
                onClick={() => {
                    dispatch(setWithMyIdAC(false))
                }}>All
        </button>
    </div>
}