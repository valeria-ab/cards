import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import styles from './Learning.module.scss';
import {
    setMyCurrentGradeAC,
    updateGradeTC
} from '../../../BLL/cards/cards-reducer';
import {useParams} from 'react-router-dom';
import {CardResponseType} from '../../../DAL/cards-api';
import {CardPacksType} from '../../../DAL/packs-api';


type  LearnPackPropsType = {
    learnModeOff: () => void
    questionModeOn: () => void
    pack: CardPacksType
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

        dispatch(updateGradeTC(props.card._id))
        props.learnModeOff()
        props.questionModeOn()
    }



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
                    {/*<RateYourself/>*/}
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
