import React from 'react';
import s from './ModalsCommonStyles.module.css';
import {useDispatch} from 'react-redux';
import {deleteCardTC} from '../../BLL/cards/cards-reducer';
import {CardResponseType} from '../../DAL/cards-api';

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
        <div className={s.modal}>
            <div className={s.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={s.wrap}>
                    <div className={s.header}>
                        <h2 className={s.title}>Delete card</h2>
                    </div>
                    <p className={s.deleteItemText}> Do you really want to remove card
                        question <b>"{props.cards.question}"</b> ?</p>
                    <div className={s.wrapBtn}>
                        <button className={s.btnCancel}
                                onClick={props.deleteModeOff}>
                            Cancel
                        </button>
                        <button onClick={onSaveClick} className={s.deleteButton}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

