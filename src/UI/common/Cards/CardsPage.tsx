import React, {useCallback, useEffect, useState} from 'react';
import s from '../Table/Table.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {createCardTC, getCardsTC, updateCardTC} from '../../../BLL/cards/cards-reducer';
import {IAppStore} from '../../../BLL/store/store';
import {DeleteCard} from '../../Modals/DeleteCard/DeleteCard';
import {AddUpdate} from '../../Modals/AddUpdateCard/AddUpdate';
import {PaginationCardsContainer} from '../Pagination/PaginationCardsContainer';
import {CardResponseType} from '../../../DAL/cards-api';
import {Navigate, useParams} from 'react-router-dom';
import SearchCardsContainer from '../Search/SearchCardsContainer';
import {ArrowBack, CardsTable} from './CardsTable';
import {ErrorSnackbar} from '../Error/ErrorSnackbar';



export const CardsPage = React.memo(() => {
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



    useEffect(() => {
        if (packId && isInitialized) {
            dispatch(getCardsTC({cardsPack_id: packId}))
        }
    }, [page, packId, pageCount, cardQuestion])

    const deleteModeOn = useCallback((cards: CardResponseType) => {
        setCardsCurrent(cards)
        setDeleteMode(true)
    }, [])
    const deleteModeOff = useCallback(() => {
        setDeleteMode(false)
        setCardsCurrent(null)
    }, [])
    const addUpdateOn = useCallback((card: CardResponseType) => {
        setAddEditMode(true)
        setCardsCurrent(card)
    }, [])
    const addUpdateOff = useCallback(() => {
        setAddMode(false)
        setCardsCurrent(null)
    }, [])

    const updateCard = useCallback((cardId: string, question: string, answer: string,) => {
        if (packId) dispatch(updateCardTC(packId, cardId, question, answer))
        setAddEditMode(false)

    }, [])
    const createCard = useCallback((question: string, answer: string) => {
        if (packId) dispatch(createCardTC(packId, question, answer))
        setAddMode(false)
        setCardsCurrent(null)
    }, [])

    if (!isInitialized) {
        return <Navigate to={'/login'}/>;
    }
    // if (isLoading) return <div>loading...</div>

    return (
        <div className={s.container}>
        {/*<div className={s.table}>*/}
            <SearchCardsContainer/>
            {cards && cardsCurrent && deleteMode &&
                <DeleteCard cards={cardsCurrent} deleteModeOff={deleteModeOff}/>}


            {addEditMode && cardsCurrent &&
                <AddUpdate addUpdateOff={addUpdateOff}
                           updateCard={updateCard}
                           card={cardsCurrent}
                />}
            {addMode && <AddUpdate
                createCard={createCard}
                addUpdateOff={addUpdateOff}
            />}



            <ArrowBack layout={layout}/>

            <button className={s.add} onClick={() =>  setAddMode(true)}> Add Card</button>
           <CardsTable
               addUpdateOn={addUpdateOn}
               deleteModeOn={deleteModeOn}
               cards={cards}
               isLoading={isLoading}
           />
            <PaginationCardsContainer/>
            <ErrorSnackbar/>
        {/*</div>*/}
        </div>
    );
});

