import React from 'react';
import styles from './Learning.module.scss';
import {CardResponseType} from '../../../DAL/cards-api';
import {CardPacksType} from '../../../DAL/packs-api';
import {useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';
import {NavLink} from 'react-router-dom';
import {PACKS_LIST_PATH, PROFILE_PATH} from '../../Routes';
import {CircularProgress} from '@mui/material';
import {RequestStatusType} from '../../../BLL/app/app-reducer';


type  LearnPackPropsType = {
    questionMode: (value:boolean) => void
    packName: string | undefined
    card: CardResponseType
    checkYourselfModeOn: () => void
}

export const QuestionModal = React.memo((props: LearnPackPropsType) => {
    // console.log("question")

    const layout = useSelector<IAppStore, 'profile' | 'packs-list'>(state => state.cards.layout)
    const status = useSelector<IAppStore, RequestStatusType>((state) => state.app.status);

    // if (status === "loading") {
    //     return (
    //         <div
    //             style={{
    //                 position: "fixed",
    //                 top: "30%",
    //                 textAlign: "center",
    //                 width: "100%",
    //             }}
    //         >
    //             <CircularProgress />
    //         </div>
    //     );
    // }

    return (

        <div className={styles.modal}>
            <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={styles.wrap}>
                    <div className={styles.header} style={{marginBottom: 0}}>
                        <h2 className={styles.title}>Learn "{props.packName}"</h2>
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

})
