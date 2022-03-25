import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import s from '../Modals/ModalsCommonStyles.module.css';
import {NavLink} from 'react-router-dom';
import {RateYourself} from './Rate/RateYourself';
import {PACKS_LIST_PATH, PROFILE_PATH} from '../Routes';
import {setMyCurrentGradeAC, updateGradeTC} from '../../BLL/cards/cards-reducer';
import {IAppStore} from '../../BLL/store/store';
import {CardResponseType} from '../../DAL/cards-api';


export const CheckYourself = React.memo((props: {
    card: CardResponseType
    packName: string | undefined
    checkYourselfModeOff: () => void
    questionMode: (value: boolean) => void
}) => {
    const layout = useSelector<IAppStore, 'profile' | 'packs-list'>(state => state.cards.layout)
    const dispatch = useDispatch()

    const onNextClick = () => {
        dispatch(updateGradeTC(props.card._id))
        props.checkYourselfModeOff()
        //зануляет setMyCurrentGradeAC
        dispatch(setMyCurrentGradeAC(1))
    }

    return (

        <div className={s.modal}>
            <div className={s.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={s.wrap}>
                    <div className={s.header}>
                        <h2 className={s.title}>Learn "{props.packName}"</h2>
                    </div>
                    <div className={s.questionBody}>
                        <div>
                            <b>Question: </b>
                            <span> {props.card.question}</span>
                        </div>
                        <div>
                            <b>Answer:</b>
                            <span> {props.card.answer}</span>
                        </div>
                    </div>
                    <RateYourself/>
                    <div className={s.wrapBtn}>
                        <NavLink to={
                            layout === 'packs-list'
                                ? PACKS_LIST_PATH
                                : PROFILE_PATH
                        }>
                            <button className={s.btnCancel}
                                    onClick={() => props.questionMode(false)}
                            >
                                Cancel
                            </button>
                        </NavLink>
                        <button onClick={onNextClick}
                                className={s.mainButton}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
})
