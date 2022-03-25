import React from 'react';
import s from '../Modals/ModalsCommonStyles.module.css';
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {PACKS_LIST_PATH, PROFILE_PATH} from '../Routes';
import {IAppStore} from '../../BLL/store/store';
import {CardResponseType} from '../../DAL/cards-api';


type  LearnPackPropsType = {
    questionMode: (value: boolean) => void
    packName: string | undefined
    card: CardResponseType
    checkYourselfModeOn: () => void
}

export const QuestionModal = React.memo((props: LearnPackPropsType) => {

    const layout = useSelector<IAppStore, 'profile' | 'packs-list'>(state => state.cards.layout)


    return (

        <div className={s.modal}>
            <div className={s.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={s.wrap}>
                    <div className={s.header} style={{marginBottom: 0}}>
                        <h2 className={s.title}>Learn "{props.packName}"</h2>
                    </div>
                    <div className={s.questionBody}>
                        <b>Question: </b>
                        <span> {props.card.question}</span>
                    </div>

                    <div className={s.wrapBtn}>
                        <NavLink to={
                            layout === 'packs-list'
                                ? PACKS_LIST_PATH
                                : PROFILE_PATH
                        }>
                            <button className={s.btnCancel} onClick={() => props.questionMode(false)}>
                                Cancel
                            </button>
                        </NavLink>
                        <button onClick={() => props.checkYourselfModeOn()}
                                className={s.mainButton}
                        >
                            Show answer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

})
