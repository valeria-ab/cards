import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';
import {RateYourself} from '../../Rate/RateYourself';
import {cardPacksType} from '../../../DAL/Packs-api';
import React, {useEffect} from 'react';
import styles from './Learn.module.scss';
import {
    setMyCurrentGradeAC,
    updateGradeTC
} from '../../../BLL/cards/cards-reducer';
import {CardResponseType} from '../../../DAL/CardsAPI';
import {useParams} from 'react-router-dom';


type  LearnPackPropsType = {
    learnModeOff: () => void
    questionModeOn: () => void
    pack: cardPacksType
    card: CardResponseType
}

export const Learn = (props: LearnPackPropsType) => {
    const {learningCardId} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        const body = document.querySelector('body');
        if (body) body.style.overflow = 'hidden';
        return () => {
            if (body) body.style.overflow = 'auto';
        };
    }, []);

    const onNextClick = () => {

        //зануляет setMyCurrentGradeAC
        dispatch(setMyCurrentGradeAC(1))

        dispatch(updateGradeTC(grade, props.card._id))
        props.learnModeOff()
        props.questionModeOn()
    }

    const grade = useSelector<IAppStore, number>(state => state.cards.myCurrentGrade)

    return (

        <div className={styles.modal}>
            <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={styles.wrap}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Learn "pack.name"</h2>
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
                        <button className={styles.btnCancel} onClick={props.learnModeOff}>
                            Cancel
                        </button>
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
