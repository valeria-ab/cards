import React from 'react';
import styles from './DeleteCard.module.scss';
import {useDispatch} from "react-redux";
import {deleteCardTC} from "../../../BLL/cards/cards-reducer";
import {CardResponseType} from '../../../DAL/cards-api';

type  DeleteCardsPropsType = {
    deleteModeOff: () => void
    cards: CardResponseType
}


export const DeleteCard = React.memo((props: DeleteCardsPropsType) => {

    const dispatch = useDispatch()


    const onSaveClick = () => {
        dispatch(deleteCardTC(
            props.cards._id, props.cards.cardsPack_id
        ))
        props.deleteModeOff()
    }

    return (
        <div className={styles.modal}>
            <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={styles.wrap}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Delete card</h2>
                    </div>
                    <p className={styles.text}>Do you really want to remove card question {props.cards.question} ?</p>
                    <div className={styles.wrapBtn}>
                        <button className={styles.btnCancel}
                                onClick={props.deleteModeOff}>
                            Cancel
                        </button>
                        <button onClick={onSaveClick} className={styles.btnSave}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

