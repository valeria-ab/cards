import React, {useEffect, useState} from 'react';
import s from '../Table/Table.module.scss';
import ArrowBackIcon from '../../image/png-transparent-arrow-computer-icons-left-arrow-angle-text-rectangle.png'
import {useDispatch, useSelector} from 'react-redux';
import {createCardTC, getCardsTC, setSearchСardQuestionAC, updateCardTC} from '../../BLL/cards/cards-reducer';
import {IAppStore} from '../../BLL/store/store';
import {DeleteCard} from '../Modals/DeleteCard/DeleteCard';
import {AddUpdate} from '../Modals/AddUpdateCard/AddUpdate';
import {PaginationCardsContainer} from '../PacksList/Pagination/PaginationCardsContainer';
import Search from '../PacksList/Search/Search';
import {ErrorSnackbar} from '../Error/ErrorSnackbar';
import {CardResponseType, cardsApi} from '../../DAL/cards-api';
import {Navigate, NavLink, useParams} from 'react-router-dom';
import {PACKS_LIST_PATH, PROFILE_PATH} from '../Routes';
import PackListIcon from '../../image/PacksListImg.png';
import {Rating} from "react-simple-star-rating";
import SearchCardsContainer from '../PacksList/Search/SearchCardsContainer';
import {setSearchPackNameAC} from '../../BLL/packs/packs-reducer';

type CardsPropsType = {
    // refresh: () => void
    // id: string
    // cardsModeOff: () => void
    // tableOffHandler: () => void
}

export const Cards = (props: CardsPropsType) => {

    const dispatch = useDispatch()
    const {packId} = useParams()
    const cards = useSelector<IAppStore, CardResponseType[]>(state => state.cards.cards)
    const pageCount = useSelector<IAppStore, number>(state => state.cards.pageCount)
    const [deleteMode, setDeleteMode] = useState<boolean>(false);
    const [cardsCurrent, setCardsCurrent] = useState<CardResponseType | null>(null);
    const [addEditMode, setAddEditMode] = useState<boolean>(false);
    const [addMode, setAddMode] = useState<boolean>(false);
    let page = useSelector<IAppStore, number>(state => state.cards.page)
    const isLoading = useSelector<IAppStore, boolean>((state) => state.app.isLoading);
    const layout = useSelector<IAppStore, 'profile' | 'packs-list'>(state => state.cards.layout)
    const cardQuestion = useSelector<IAppStore, string>(state => state.cards.cardQuestion)
    const isInitialized = useSelector<IAppStore, boolean>((state) => state.app.isInitialized);
    const [rating, setRating] = useState(0)
    const handleRating = (rate: number) => {
        setRating(rate)
        // other logic
    }

    useEffect(() => {
        if (packId && isInitialized) {
            dispatch(getCardsTC({cardsPack_id: packId}))
        }
    }, [page, packId, pageCount, cardQuestion])

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
        if (packId) dispatch(updateCardTC(packId, cardId, question, answer))
        setAddEditMode(false)

    }


    const createCard = (question: string, answer: string) => {
        if (packId) dispatch(createCardTC(packId, question, answer))
        setAddMode(false)
        setCardsCurrent(null)
    }


    if (isLoading) return <div>loading...</div>

    return (
        <div className={s.container}>
        <div className={s.table}>
            <SearchCardsContainer/>
            {cards && cardsCurrent && deleteMode &&
                <DeleteCard cards={cardsCurrent} deleteModeOff={deleteModeOff}/>}


            {addEditMode && cardsCurrent &&
                <AddUpdate addUpdateOff={addUpdateOff} updateCard={updateCard}
                           card={cardsCurrent}/>}
            {addMode && <AddUpdate createCard={createCard} addUpdateOff={addUpdateOff}/>}
            <NavLink to={
                layout === 'packs-list'
                    ? PACKS_LIST_PATH
                    : PROFILE_PATH
            }>
<button >
    <img className={s.back} src={ArrowBackIcon} alt="ArrowBack"/>
</button>


            </NavLink>
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
                            <td className={s.table__data}>{card.updated.slice(0,10)}</td>
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
                            {/*<td className={s.table__data}>{card.grade}</td>*/}
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
            <PaginationCardsContainer/>
            <ErrorSnackbar/>
        </div>
        </div>
    );
};

