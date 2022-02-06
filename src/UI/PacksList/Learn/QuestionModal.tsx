import {cardPacksType} from '../../../DAL/Packs-api';
import React, {useEffect} from 'react';
import styles from './Learn.module.scss';
import {CardResponseType} from '../../../DAL/CardsAPI';


type  LearnPackPropsType = {
    learnModeOn: () => void
    questionModeOff: () => void
    pack: cardPacksType
    card: CardResponseType
}

export const QuestionModal = (props: LearnPackPropsType) => {
    useEffect(() => {
        const body = document.querySelector('body');
        if (body) body.style.overflow = 'hidden';
        return () => {
            if (body) body.style.overflow = 'auto';
        };
    }, []);

    if (!props.card || !props.pack) {
        return <div className={styles.modal}>
            <div className={styles.wrapper}>
                <div className={styles.wrap}>
                    <div className={styles.questionBody}>error in questionModal props</div>
                </div>
            </div>
        </div>
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
