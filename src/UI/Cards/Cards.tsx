import React, {useEffect, useState} from 'react';
import styles from "../Table/Table.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getCardsTC} from "../../BLL/cards/cards-reducer";
import {IAppStore} from "../../BLL/store/store";
import {CardResponseType, cardsApi} from "../../DAL/CardsAPI";
import {DeleteCard} from "../Modals/DeleteCard/DeleteCard";
import {AddUpdate} from "../Modals/AddUpdateCard/AddUpdate";
import {PaginationCardsContainer} from '../PacksList/Pagination/PaginationCardsContainer';
import Search from '../PacksList/Search/Search';

type  CardsPropsType = {
    id: string
    cardsModeOff: () => void
    tableOffHandler: () => void
}

export const Cards = (props: CardsPropsType) => {
    const dispatch = useDispatch()
    const cards = useSelector<IAppStore, CardResponseType[]>(state => state.cardsReducer.cards)
    const [deleteMode, setDeleteMode] = useState<boolean>(false);
    const [cardsCurrent, setCardsCurrent] = useState<CardResponseType | null>(null);
    const [addEditMode, setAddEditMode] = useState<boolean>(false);
    const [addMode, setAddMode] = useState<boolean>(false);




    useEffect(() => {
        dispatch(getCardsTC({cardsPack_id: props.id}))
        props.tableOffHandler()
    }, [])


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

    const updateCard = (id: string, question: string, answer: string,) => {
        cardsApi.updateCard({
            _id: id,
            question: question,
            answer: answer
        })
            .then(() => {
                dispatch(getCardsTC({cardsPack_id: props.id}))
                setAddEditMode(false)
            })
    }



    const createCard = (question: string, answer: string) => {
            cardsApi.sendCard({
                cardsPack_id: props.id,
                question,
                answer
            })
                .then(()=> {
                    setAddMode(false)
                    setCardsCurrent(null)
                    dispatch(getCardsTC({cardsPack_id: props.id}))
                })


    }


    return (
        <div className={styles.table}>
            <Search/>
            {cards && cardsCurrent && deleteMode &&
            <DeleteCard cards={cardsCurrent} deleteModeOff={deleteModeOff}/>}


            {addEditMode && cardsCurrent &&
            <AddUpdate addUpdateOff={addUpdateOff} updateCard={updateCard}
                       card={cardsCurrent}/>}
            {addMode && <AddUpdate createCard={createCard} addUpdateOff={addUpdateOff}/>}
            <div onClick={() => {
                props.cardsModeOff()
            }} className={styles.back}>Back to Packs
            </div>

            <button className={styles.add} onClick={addCardOn}> Add Card</button>
            <div className={styles.header}>
                <div className={styles.header__item}>Question</div>
                <div className={styles.header__item}>Answer</div>
                <div className={styles.header__item}>Last Updated</div>
                <div className={styles.header__item}>Grade</div>
                <div className={styles.header__item}>Actions</div>
            </div>
            <div className={styles.table__main}>

                {cards.map((card) => {
                    return (<div key={card._id} className={styles.table__row}>
                        <div className={styles.table__name}>{card.question}</div>
                        <div className={styles.table__cards}>{card.answer}</div>
                        <div className={styles.table__updated}>{card.updated}</div>
                        <div className={styles.table__created}>{card.grade}</div>
                        <div className={styles.table__actions}>
                            <div className="buttons">
                                <button onClick={() => {
                                    deleteModeOn(card)
                                }}>Delete
                                </button>
                                <button onClick={() => {
                                    addUpdateOn(card)
                                }}>Edit
                                </button>
                            </div>
                        </div>
                    </div>)
                })}
            </div>
            <PaginationCardsContainer id={props.id}/>
        </div>
    );
};

