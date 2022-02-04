import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';
import {RateYourself} from '../../Rate/RateYourself';
import {cardPacksType} from '../../../DAL/Packs-api';
import React, {useEffect, useState} from 'react';
import {deletedPacks} from '../../../BLL/packs/packs-reducer';
import styles from './Learn.module.scss';
import {getCardsTC, InitialCardsStateType, updateGradeTC} from '../../../BLL/cards/cards-reducer';
import {CardResponseType, cardsApi} from '../../../DAL/CardsAPI';
import {QuestionType} from './Learn';

type  LearnPackPropsType = {
    learnModeOn: () => void
    questionModeOff: () => void
    pack: cardPacksType
    card: CardResponseType
    // questions: Array<QuestionType>
}

export const QuestionModal = (props: LearnPackPropsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        const body = document.querySelector('body');
        if (body) body.style.overflow = 'hidden';
        return () => {
            if (body) body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        // dispatch(getCardsTC({ cardsPack_id: props.id }))
    }, [])

    const onSaveClick = () => {
        // dispatch(deletedPacks(
        //     props.pack._id, props.pack.user_id
        // ))
        dispatch(updateGradeTC(grade, props.pack._id))
        // props.deleteModeOff()
    }

    const getQuestions = () => {
        dispatch(getCardsTC({cardsPack_id: props.pack._id}))

        // .then(() => {
        //     setAddMode(false)
        //     setCardsCurrent(null)
        //     dispatch(getCardsTC({ cardsPack_id: props.id }))
        // })


    }
    const currentCardIndex = useSelector<IAppStore, number>(state => state.cardsReducer.currentCardIndex)
    const grade = useSelector<IAppStore, number>(state => state.cardsReducer.myCurrentGrade)
    const cards = useSelector<IAppStore, CardResponseType[]>(state => state.cardsReducer.cards)
    // const questions = cards.map(c => ({question: c.question, answer: c.answer}))

    return (

        <div className={styles.modal}>
            <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={styles.wrap}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Learn "{props.pack.name}"</h2>
                    </div>
                    <div className={styles.questionBody}>
                        {/*{questions.length*/}
                        {/*    ? <>*/}
                        {/*        <div className={styles.bold}>Question:*/}
                        {/*            <span className={styles.regular}> {props.card}</span>*/}
                        {/*        </div>*/}
                        {/*    </>*/}
                        {/*    : <div>There are no questions yet</div>*/}
                        {/*}*/}

                        <div className={styles.bold}>Question:
                            <span className={styles.regular}> {props.card.question}</span>
                        </div>
                    </div>

                    <div className={styles.wrapBtn}>
                        <button className={styles.btnCancel} onClick={props.questionModeOff}>
                            Cancel
                        </button>
                        <button onClick={props.learnModeOn}


                                className={styles.btnNext}

                        >
                            Show answer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
