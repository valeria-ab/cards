import React from 'react';
import s from '../Table/Table.module.scss';
import ArrowBackIcon from '../../../image/png-transparent-arrow-computer-icons-left-arrow-angle-text-rectangle.png'
import {CardResponseType} from '../../../DAL/cards-api';
import {NavLink} from 'react-router-dom';
import {PACKS_LIST_PATH, PROFILE_PATH} from '../../Routes';
import {Rating} from 'react-simple-star-rating';

type CardsPropsType = {
    cards: CardResponseType[]
    isLoading: boolean
    deleteModeOn: (card: CardResponseType) => void
    addUpdateOn: (card: CardResponseType) => void
}

export const CardsTable = React.memo((props: CardsPropsType) => {

    if (props.isLoading) return <div>loading...</div>

    return (
        <div className={s.tableMain}>
            <table className={s.tableWrapper}>
                <thead className={s.tableHeader}>
                <tr className={s.table__headRow}>
                    <th className={s.table__head}>Question</th>
                    <th className={s.table__head}>Answer</th>
                    <th className={s.table__head}>Last Updated</th>
                    <th className={s.table__head}>Grade</th>
                    <th className={s.table__head}>Actions</th>
                </tr>
                </thead>
                <tbody className={s.table__main}>

                {props.cards.map((card) => {
                    return (<tr key={card._id} className={s.table__row}>
                        <td className={s.table__data}>{card.question}</td>
                        <td className={s.table__data}>{card.answer}</td>
                        <td className={s.table__data}>{card.updated.slice(0, 10)}</td>
                        <td className={s.table__data}>
                            <Rating
                                readonly
                                emptyColor={'#D7D8EF'}
                                transition
                                fillColor={'#21268F'}
                                size={20}
                                ratingValue={card.grade * 20}
                            />

                        </td>

                        <td className={s.buttons}>
                            <button className={s.delButtonWrapper} onClick={() => {
                                props.deleteModeOn(card)
                            }}>Delete
                            </button>
                            <button className={s.buttonWrapper} onClick={() => {
                                props.addUpdateOn(card)
                            }}>Edit
                            </button>
                        </td>
                    </tr>)
                })}
                </tbody>
            </table>
        </div>
    );
});

export const ArrowBack = React.memo((props: { layout: 'profile' | 'packs-list' }) => {

    return (<div>
            <NavLink to={
                props.layout === 'packs-list'
                    ? PACKS_LIST_PATH
                    : PROFILE_PATH
            }>
                <button>
                    <img className={s.back} src={ArrowBackIcon} alt="ArrowBack"/>
                </button>
            </NavLink>
        </div>
    )
})