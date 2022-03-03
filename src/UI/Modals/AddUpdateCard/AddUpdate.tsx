import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from "./AddUpdate.module.scss";
import {CardResponseType} from '../../../DAL/cards-api';
import {useDispatch} from 'react-redux';


type  AddUpdatePropsType = {
    addUpdateOff?: () => void
    card?: CardResponseType
    updateCard?: (id: string, question: string, answer: string) => void
    createCard?: (question: string, answer: string) => void
}

export const AddUpdate = React.memo((props: AddUpdatePropsType) => {

    const [answer, setAnswer] = useState<string>(props.card ? props.card.answer : "");
    const [question, setQuestion] = useState<string>(props.card ? props.card.question : "");


    const onInputQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }

    const onInputAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const onSaveHandler = () => {
        if (props.updateCard && props.card?._id) {
            return props.updateCard(props.card?._id, question, answer)
        } else if (props.createCard) {
            return props.createCard(question, answer)
        }
    }


    return (
        <div className={styles.modal}>
            <div className={styles.wrapper}>
                <div className={styles.wrap} onClick={(e) => e.stopPropagation()}>
                    <h3 className={styles.subtitle}>Card Info</h3>

                    <div className={styles.content}>
                        <p className={styles.text}>Question</p>
                        <input
                            type='text'
                            className={styles.input}
                            value={question}
                            onChange={onInputQuestionHandler}
                        />

                        <div className={styles.dada}>
                            <label htmlFor='myfile2' className={styles.chous}>
                                + Attach file
                            </label>
                            <input type='file' className={styles.my} id='myfile2'
                                   name='myfile2'/>
                        </div>

                        <p className={styles.text}>Answer</p>
                        <input
                            type='text'
                            className={styles.input}
                            value={answer}
                            onChange={onInputAnswerHandler}
                        />
                        <div className={styles.dada}>
                            <label htmlFor='myfile2' className={styles.chous}>
                                + Attach file
                            </label>
                            <input type='file' className={styles.my} id='myfile2'
                                   name='myfile2'/>
                        </div>
                        <div className={styles.wrapBtn}>
                            <button onClick={props.addUpdateOff}
                                    className={styles.btnCancel}>
                                Cancel
                            </button>
                            <button onClick={onSaveHandler} className={styles.btnSave}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

