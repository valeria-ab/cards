import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';
import {cardPacksType} from '../../../DAL/Packs-api';
import React, {useEffect, useState} from 'react';
import styles from './Learn.module.scss';
import {
    getCardsTC,
    setMyCurrentGradeAC
} from '../../../BLL/cards/cards-reducer';
import {CardResponseType} from '../../../DAL/CardsAPI';
import {useParams} from 'react-router-dom';

export const Learning = () => {
    const {learningPackId} = useParams()
    const dispatch = useDispatch()

    const [learnMode, setLearnMode] = useState<boolean>(false);
    const [questionMode, setQuestionMode] = useState<boolean>(true);

    const learnModeOn = () => {
        setLearnMode(true)

    }
    const learnModeOff = () => {
        setLearnMode(false)
        setQuestionMode(false)
    }
    const questionModeOn = () => {
        setQuestionMode(true)

    }
    const questionModeOff = () => {
        setQuestionMode(false)
    }

    useEffect(() => {
        const body = document.querySelector('body');
        if (body) body.style.overflow = 'hidden';
        return () => {
            if (body) body.style.overflow = 'auto';
        };
    }, []);


    useEffect(() => {
        if (learningPackId) {
            dispatch(getCardsTC({ cardsPack_id: learningPackId }))
        }

    }, [learningPackId])

    const onNextClick = () => {

        dispatch(setMyCurrentGradeAC(1))
        // if (questions.length > currentCardIndex) {
        //     dispatch(setCurrentCardIndexAC(currentCardIndex + 1))
        //     dispatch(updateGradeTC(grade, questions[currentCardIndex].id))
        // }
        learnModeOff()
       questionModeOn()

    }



    const grade = useSelector<IAppStore, number>(state => state.cardsReducer.myCurrentGrade)
    // const currentCardIndex = useSelector<IAppStore, number>(state => state.cardsReducer.currentCardIndex)
    const cards = useSelector<IAppStore, CardResponseType[]>(state => state.cardsReducer.cards)
    const packs = useSelector<IAppStore, cardPacksType[]>(state => state.packs.cardPacks)
    const questions = cards.map(c => ({question: c.question, answer: c.answer, id: c._id}))
    const pack = packs.find(p => p._id === learningPackId)


        return (

            <div className={styles.modal}>
                {/*{pack && questionMode && <QuestionModal pack={pack} learnModeOn={() => learnModeOn()} questionModeOff={questionModeOff}/>}*/}
                {/*{pack && learnMode  && <Learn pack={pack}  learnModeOff={learnModeOff} questionModeOn={() => questionModeOn()}/>}*/}


                {/*<div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>*/}
                {/*    <div className={styles.wrap}>*/}
                {/*        <div className={styles.header}>*/}
                {/*            <h2 className={styles.title}>Learn "{}"</h2>*/}
                {/*        </div>*/}
                {/*        <div className={styles.questionBody}>*/}
                {/*            {questions.length*/}
                {/*                ? <>*/}
                {/*                    <div className={styles.bold}>Question:*/}
                {/*                        <span className={styles.regular}>{questions[currentCardIndex].question}</span>*/}
                {/*                    </div>*/}
                {/*                    <div className={styles.bold}>Answer:*/}
                {/*                        <span className={styles.regular}>{questions[currentCardIndex].answer}</span>*/}
                {/*                    </div>*/}
                {/*                </>*/}
                {/*                : <div>There are no questions yet</div>*/}
                {/*            }*/}
                {/*        </div>*/}
                {/*        <RateYourself/>*/}
                {/*        <div className={styles.wrapBtn}>*/}
                {/*            <button className={styles.btnCancel} >*/}
                {/*                Cancel*/}
                {/*            </button>*/}
                {/*            <button onClick={onNextClick}*/}


                {/*                    className={styles.btnNext}*/}

                {/*            >*/}
                {/*                Next*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        )


}
