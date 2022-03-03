import React from 'react';
import styles from './Learning.module.scss';
import {CardResponseType} from '../../../DAL/cards-api';
import {CardPacksType} from '../../../DAL/packs-api';
import s from '../../Table/Table.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';
import {NavLink} from 'react-router-dom';
import {PACKS_LIST_PATH, PROFILE_PATH} from '../../Routes';


type  LearnPackPropsType = {
    // setCheckYourselfMode: (value:boolean) => void
    questionMode: (value:boolean) => void
    pack: CardPacksType
    card: CardResponseType
    checkYourselfModeOn: () => void
}

export const QuestionModal = (props: LearnPackPropsType) => {
    const isLoading = useSelector<IAppStore, boolean>(state => state.app.isLoading)
    const dispatch = useDispatch()

    const layout = useSelector<IAppStore, 'profile' | 'packs-list'>(state => state.cards.layout)


    if (isLoading) {
        return <div className={s.table}>loading...</div>
    }


    if (!props.card || !props.pack) {
        return <div className={s.table}>loading...</div>
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
                        <NavLink to={
                            layout === 'packs-list'
                                ? PACKS_LIST_PATH
                                : PROFILE_PATH
                        }>
                        <button className={styles.btnCancel} onClick={() => props.questionMode(false)}>
                            Cancel
                        </button>
                        </NavLink>
                        <button onClick={() => props.checkYourselfModeOn()}
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