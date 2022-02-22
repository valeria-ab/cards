import React, {useEffect, useState} from 'react';
import s from '../Table/Table.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {createCardTC, getCardsTC, updateCardTC} from '../../BLL/cards/cards-reducer';
import {IAppStore} from '../../BLL/store/store';
import {DeleteCard} from '../Modals/DeleteCard/DeleteCard';
import {AddUpdate} from '../Modals/AddUpdateCard/AddUpdate';
import {PaginationCardsContainer} from '../PacksList/Pagination/PaginationCardsContainer';
import Search from '../PacksList/Search/Search';
import {ErrorSnackbar} from '../Error/ErrorSnackbar';
import {CardResponseType, cardsApi} from '../../DAL/cards-api';

type CardsPropsType = {
    id: string
    cardsModeOff: () => void
    tableOffHandler: () => void
}

export const Cards = (props: CardsPropsType) => {
    const dispatch = useDispatch()
    const cards = useSelector<IAppStore, CardResponseType[]>(state => state.cards.cards)
    const [deleteMode, setDeleteMode] = useState<boolean>(false);
    const [cardsCurrent, setCardsCurrent] = useState<CardResponseType | null>(null);
    const [addEditMode, setAddEditMode] = useState<boolean>(false);
    const [addMode, setAddMode] = useState<boolean>(false);
    let page = useSelector<IAppStore, number>(state => state.cards.page)
    const isLoading = useSelector<IAppStore, boolean>((state) => state.app.isLoading);

    useEffect(() => {
        dispatch(getCardsTC({cardsPack_id: props.id}))
        props.tableOffHandler()
    }, [page, props.id])


    const deleteModeOn = (cards: CardResponseType) => {
        setCardsCurrent(cards)
        setDeleteMode(true)

    }
    const deleteModeOff = () => {
        setDeleteMode(false)
        setCardsCurrent(null)
    }


    const addUpdateOn = (card: CardResponseType) => {
        setAddEditMode(true)
        setCardsCurrent(card)
    }

    const addUpdateOff = () => {
        setAddMode(false)
        setCardsCurrent(null)
    }

    const addCardOn = () => {
        setAddMode(true)
    }

    const updateCard = (cardId: string, question: string, answer: string,) => {
        dispatch(updateCardTC(props.id, cardId, question, answer))
        setAddEditMode(false)

    }


    const createCard = (question: string, answer: string) => {
        dispatch(createCardTC(props.id, question, answer))
        setAddMode(false)
        setCardsCurrent(null)
    }
if(isLoading) return <div>loading...</div>

    return (
        <div className={s.table}>
            <Search/>
            {cards && cardsCurrent && deleteMode &&
                <DeleteCard cards={cardsCurrent} deleteModeOff={deleteModeOff}/>}


            {addEditMode && cardsCurrent &&
                <AddUpdate addUpdateOff={addUpdateOff} updateCard={updateCard}
                           card={cardsCurrent}/>}
            {addMode && <AddUpdate createCard={createCard} addUpdateOff={addUpdateOff}/>}
            <div onClick={() => {
                props.cardsModeOff()
            }} className={s.back}>Back to Packs
            </div>

            <button className={s.add} onClick={addCardOn}> Add Card</button>
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

                    {cards.map((card) => {
                        return (<tr key={card._id} className={s.table__row}>
                            <td className={s.table__data}>{card.question}</td>
                            <td className={s.table__data}>{card.answer}</td>
                            <td className={s.table__data}>{card.updated}</td>
                            <td className={s.table__data}>{card.grade}</td>
                            <td className={s.buttons}>
                                <button className={s.delButtonWrapper} onClick={() => {
                                    deleteModeOn(card)
                                }}>Delete
                                </button>
                                <button className={s.buttonWrapper} onClick={() => {
                                    addUpdateOn(card)
                                }}>Edit
                                </button>
                            </td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
            <PaginationCardsContainer id={props.id}/>
            <ErrorSnackbar/>
        </div>
    );
};

