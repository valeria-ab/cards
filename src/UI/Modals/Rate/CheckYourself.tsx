import {setMyCurrentGradeAC, updateGradeTC} from '../../../BLL/cards/cards-reducer';
import {useDispatch, useSelector} from 'react-redux';
import React, {FormEvent} from 'react';
import {IAppStore} from '../../../BLL/store/store';
import styles from '../Learning/Learning.module.scss';
import s from './Rate.module.scss';
import {CardResponseType} from '../../../DAL/cards-api';
import {CardPacksType} from '../../../DAL/packs-api';
import {NavLink} from 'react-router-dom';
import {PACKS_LIST_PATH, PROFILE_PATH} from '../../Routes';
import {RateYourself} from './RateYourself';


export const CheckYourself = (props: {
    card: CardResponseType
    pack: CardPacksType
    checkYourselfModeOff: () => void
    questionMode: (value: boolean) => void
}) => {
    const layout = useSelector<IAppStore, 'profile' | 'packs-list'>(state => state.cards.layout)
    const dispatch = useDispatch()
    const onNextClick = () => {
        dispatch(updateGradeTC(props.card._id))
        props.checkYourselfModeOff()
        //зануляет setMyCurrentGradeAC
        dispatch(setMyCurrentGradeAC(1))
    }
    return (

        <div className={styles.modal}>
            <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={styles.wrap}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Learn {props.pack.name}</h2>
                    </div>
                    <div className={styles.questionBody}>
                        <div className={styles.bold}>Question:
                            <span className={styles.regular}>{props.card.question}</span>
                        </div>
                        <div className={styles.bold}>Answer:
                            <span className={styles.regular}>{props.card.answer}</span>
                        </div>
                    </div>
                    <RateYourself/>
                    <div className={styles.wrapBtn}>
                        <NavLink to={
                            layout === 'packs-list'
                                ? PACKS_LIST_PATH
                                : PROFILE_PATH
                        }>
                            <button className={styles.btnCancel} onClick={() => props.questionMode(false)}>
                                Cancel
                            </button>
                        </NavLink>
                        <button onClick={onNextClick}
                                className={styles.btnNext}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
