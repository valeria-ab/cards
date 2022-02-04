import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';
import {RateYourself} from '../../Rate/RateYourself';
import {cardPacksType} from '../../../DAL/Packs-api';
import React, {useEffect, useState} from 'react';
import {deletedPacks} from '../../../BLL/packs/packs-reducer';
import styles from './Learn.module.scss';
import {
    getCardsTC,
    InitialCardsStateType,
    setCurrentCardIndexAC,
    setMyCurrentGradeAC,
    updateGradeTC
} from '../../../BLL/cards/cards-reducer';
import {CardResponseType, cardsApi} from '../../../DAL/CardsAPI';
import {useParams} from 'react-router-dom';

export type QuestionType = {
    question: string
    answer: string
    id: string
}
type  LearnPackPropsType = {
    learnModeOff: () => void
    questionModeOn: () => void
    pack: cardPacksType
    card: CardResponseType
    // questions: Array<QuestionType>
}

export const Learn = (props: LearnPackPropsType) => {
    const {learningCard} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        const body = document.querySelector('body');
        if (body) body.style.overflow = 'hidden';
        return () => {
            if (body) body.style.overflow = 'auto';
        };
    }, []);

    const onNextClick = () => {

        dispatch(setMyCurrentGradeAC(1))
        // if (questions.length > currentCardIndex) {
        //     dispatch(setCurrentCardIndexAC(currentCardIndex + 1))
        //     dispatch(updateGradeTC(grade, questions[currentCardIndex].id))
        // }
        dispatch(setCurrentCardIndexAC(currentCardIndex + 1))
        dispatch(updateGradeTC(grade, props.card._id))
        props.learnModeOff()
        props.questionModeOn()

    }


    const grade = useSelector<IAppStore, number>(state => state.cardsReducer.myCurrentGrade)
    const currentCardIndex = useSelector<IAppStore, number>(state => state.cardsReducer.currentCardIndex)
    const cards = useSelector<IAppStore, CardResponseType[]>(state => state.cardsReducer.cards)
    // const questions = cards.map(c => ({question: c.question, answer: c.answer, id: c._id}))

    return (

        <div className={styles.modal}>
            <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={styles.wrap}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Learn "pack.name"</h2>
                    </div>
                    <div className={styles.questionBody}>
                        {/*{questions.length*/}
                        {/*    ? <>*/}
                        {/*        <div className={styles.bold}>Question:*/}
                        {/*            <span className={styles.regular}>{questions[currentCardIndex].question}</span>*/}
                        {/*        </div>*/}
                        {/*        <div className={styles.bold}>Answer:*/}
                        {/*            <span className={styles.regular}>{questions[currentCardIndex].answer}</span>*/}
                        {/*        </div>*/}
                        {/*    </>*/}
                        {/*    : <div>There are no questions yet</div>*/}
                        {/*}*/}

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
