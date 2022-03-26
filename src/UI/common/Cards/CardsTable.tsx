import React from 'react';
import styles from './CardsPage.module.css';
import s from '../Table/Table.module.scss';
import ArrowBackIcon from '../../../image/27323.svg'
import {CardResponseType} from '../../../DAL/cards-api';
import {NavLink} from 'react-router-dom';
import {PACKS_LIST_PATH, PROFILE_PATH} from '../../Routes';
import {Rating} from 'react-simple-star-rating';

type CardsPropsType = {
    cards: CardResponseType[]
    deleteModeOn: (card: CardResponseType) => void
    addUpdateOn: (card: CardResponseType) => void
    userId: string
}

export const CardsTable = React.memo((props: CardsPropsType) => {


    return (
        <div className={s.table}>
            <div className={s.tableMain}>
            <table className={s.tableWrapper}>
                <thead className={s.tableHeader}>
                <tr className={s.table__headRow}>
                    <th className={s.table__head} style={{  width: "25%"}}>Question</th>
                    <th className={s.table__head}  style={{  width: "25%"}}>Answer</th>
                    <th className={s.table__head}>Last Updated</th>
                    <th className={s.table__head}>Grade</th>
                    {props.userId === props.cards[0].user_id && <th className={s.table__head}>Actions</th>}
                </tr>
                </thead>
                <tbody>
                {props.cards.map((card) => {
                    return (
                        <tr key={card._id} className={s.table__row}>
                            <td className={s.table__data}  style={{  width: "25%"}}>{card.question}</td>
                            <td className={s.table__data}  style={{  width: "25%"}}>{card.answer}</td>
                            <td className={s.table__data}>{card.updated.slice(0, 10)}</td>
                            <td className={s.table__data}>
                                <Rating
                                    readonly
                                    emptyColor={'#D7D8EF'}
                                    transition
                                    fillColor={'#092a61'}
                                    size={20}
                                    ratingValue={card.grade * 20}
                                />

                            </td>

                            {props.userId === props.cards[0].user_id
                                && <td className={s.table__data}>
                                    <div className={s.buttons}>
                                    <button className={s.delButtonWrapper}
                                            onClick={() => {
                                                props.deleteModeOn(card)
                                            }}>Delete
                                    </button>
                                    <button className={s.buttonWrapper} onClick={() => {
                                        props.addUpdateOn(card)
                                    }}>Edit
                                    </button>
                                    </div>
                                </td>}

                        </tr>)
                })}
                </tbody>
            </table>
            </div>
        </div>
    );
});

export const ArrowBack = React.memo((props: {
    layout: 'profile' | 'packs-list',
    onClick: () => void
}) => {

    return (<div className={styles.ArrowBack_cardsPage}>
            <NavLink to={
                props.layout === 'packs-list'
                    ? PACKS_LIST_PATH
                    : PROFILE_PATH
            }>
                <div onClick={props.onClick}>
                    <img className={styles.back}
                         src={ArrowBackIcon}
                    />
                </div>
            </NavLink>
        </div>
    )
})