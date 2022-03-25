import React, {ChangeEvent, useState} from 'react';
import s from './ModalsCommonStyles.module.css';
import {CardResponseType} from '../../DAL/cards-api';


type  AddUpdatePropsType = {
    addUpdateOff?: () => void
    card?: CardResponseType
    updateCard?: (id: string, question: string, answer: string) => void
    createCard?: (question: string, answer: string) => void
}

export const AddUpdateCard = React.memo((props: AddUpdatePropsType) => {

    const [answer, setAnswer] = useState<string>(props.card ? props.card.answer : '');
    const [question, setQuestion] = useState<string>(props.card ? props.card.question : '');


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
        <div className={s.modal}>
            <div className={s.wrapper}>
                <div className={s.wrap} onClick={(e) => e.stopPropagation()}>
                    <div className={s.header}>
                        <h3 className={s.title}>Card Info</h3>
                    </div>
                    <div className={s.content}>
                        <label>
                            <p className={s.text}>Question</p>
                            <input
                                type="text"
                                className={s.input}
                                value={question}
                                onChange={onInputQuestionHandler}
                            />
                        </label>
                        <label>
                            <p className={s.text}>Answer</p>
                            <input
                                type="text"
                                className={s.input}
                                value={answer}
                                onChange={onInputAnswerHandler}
                            />
                        </label>
                        <div className={s.wrapBtn}>
                            <button onClick={props.addUpdateOff}
                                    className={s.btnCancel}>
                                Cancel
                            </button>
                            <button onClick={onSaveHandler}
                                    className={s.mainButton}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

