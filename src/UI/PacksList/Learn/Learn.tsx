import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';
import {RateYourself} from '../../Rate/RateYourself';
import {cardPacksType} from '../../../DAL/Packs-api';
import React, {useEffect} from 'react';
import {deletedPacks} from '../../../BLL/packs/packs-reducer';
import styles from './Learn.module.scss';
import {getCardsTC, InitialCardsStateType, updateGradeTC} from '../../../BLL/cards/cards-reducer';
import {CardResponseType, cardsApi} from '../../../DAL/CardsAPI';

type  LearnPackPropsType = {
    learnModeOff: () => void
    pack: cardPacksType
}

export const Learn = (props: LearnPackPropsType) => {
    // console.log(props.pack)
    const dispatch = useDispatch()

    useEffect(() => {
        const body = document.querySelector('body');
        if (body) body.style.overflow = 'hidden';
        return () => {
            if (body) body.style.overflow = 'auto';
        };
    }, []);

    const onSaveClick = () => {
        // dispatch(deletedPacks(
        //     props.pack._id, props.pack.user_id
        // ))
        dispatch(updateGradeTC(grade, '61efb97f07698b170caca2f2'))
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

    const grade = useSelector<IAppStore, number>(state => state.cardsReducer.myCurrentGrade)
    const cards = useSelector<IAppStore, CardResponseType[]>(state => state.cardsReducer.cards)
    const questions = cards.map(c => ({question: c.question, answer: c.answer}))

    console.log(cards)
    return (

        <div className={styles.modal}>
            <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={styles.wrap}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Learn "{props.pack.name}"</h2>
                    </div>
                    <div className={styles.questionBody}>
                        {questions.length
                            ? <>
                                <div className={styles.bold}>Question:
                                    <span className={styles.regular}>{questions[0].question}</span>
                                </div>
                                <div className={styles.bold}>Answer:
                                    <span className={styles.regular}>{questions[0].answer}</span>
                                </div>
                            </>
                            : <div>There are no questions yet</div>
                        }
                    </div>
                    <RateYourself/>
                    <div className={styles.wrapBtn}>
                        <button className={styles.btnCancel} onClick={props.learnModeOff}>
                            Cancel
                        </button>
                        <button onClick={onSaveClick}


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
