import React, {useCallback, useEffect, useState} from 'react';
import styles from '../Table/Table.module.scss';
import s from './CardsPage.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {
    createCardTC,
    getCardsTC,
    InitialCardsStateType,
    setSearchСardQuestionAC,
    updateCardTC
} from '../../../BLL/cards/cards-reducer';
import {IAppStore} from '../../../BLL/store/store';
import {DeleteCard} from '../../Modals/DeleteCard';
import {AddUpdateCard} from '../../Modals/AddUpdateCard';
import {PaginationCardsContainer} from '../Pagination/PaginationCardsContainer';
import {CardResponseType} from '../../../DAL/cards-api';
import {Navigate, useParams} from 'react-router-dom';
import SearchCardsContainer from '../Search/SearchCardsContainer';
import {ArrowBack, CardsTable} from './CardsTable';
import {ErrorSnackbar} from '../Error/ErrorSnackbar';
import {RequestStatusType} from '../../../BLL/app/app-reducer';
import {Title} from '../Title';
import {setCardsPacksCountFromRangeAC} from '../../../BLL/packs/packs-reducer';


export const CardsPage = React.memo(() => {
    const dispatch = useDispatch()
    const {packId, packName} = useParams()
    const cards = useSelector<IAppStore, InitialCardsStateType>(state => state.cards)
    const pageCount = useSelector<IAppStore, number>(state => state.cards.pageCount)
    const [deleteMode, setDeleteMode] = useState<boolean>(false);
    const [cardsCurrent, setCardsCurrent] = useState<CardResponseType | null>(null);
    const [addEditMode, setAddEditMode] = useState<boolean>(false);
    const [addMode, setAddMode] = useState<boolean>(false);
    let page = useSelector<IAppStore, number>(state => state.cards.page)
    const status = useSelector<IAppStore, RequestStatusType>((state) => state.app.status);
    const layout = useSelector<IAppStore, 'profile' | 'packs-list'>(state => state.cards.layout)
    const cardQuestion = useSelector<IAppStore, string>(state => state.cards.cardQuestion)
    const isInitialized = useSelector<IAppStore, boolean>((state) => state.app.isInitialized);
    const userId = useSelector<IAppStore, string>((state) => state.profile._id);


    useEffect(() => {
        if (packId && isInitialized) {
            dispatch(getCardsTC({cardsPack_id: packId}))
        }
    }, [page, packId, pageCount, cardQuestion, dispatch, isInitialized])

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

    }, [dispatch, packId])
    const createCard = useCallback((question: string, answer: string) => {
        if (packId) dispatch(createCardTC(packId, question, answer))
        setAddMode(false)
        setCardsCurrent(null)
    }, [dispatch, packId])

    const onArrowClick = useCallback(() => {
        dispatch(setSearchСardQuestionAC(''))
        dispatch(setCardsPacksCountFromRangeAC([0, 1000]))
    }, [dispatch])

    if (!isInitialized) {
        return <Navigate to={'/login'}/>;
    }

    return (
        <div className={s.container}>
            <div className={s.cardsPageWrapper}>
                <div>
                    <div className={s.cardsPackTitleWrapper}>
                        <ArrowBack layout={layout}
                                   onClick={onArrowClick}
                        />
                        {packName && <Title value={packName}/>}
                    </div>


                    <div className={s.Table__top}>
                        <SearchCardsContainer/>
                        {userId === cards.packUserId &&
                            <button className={styles.add} onClick={() => setAddMode(true)}> Add Card</button>
                        }
                    </div>


                    {status === 'loading'
                        ? <div> </div>
                        : <>
                            {cards && cardsCurrent && deleteMode &&
                                <DeleteCard cards={cardsCurrent} deleteModeOff={deleteModeOff}/>}


                            {addEditMode && cardsCurrent &&
                                <AddUpdateCard addUpdateOff={addUpdateOff}
                                               updateCard={updateCard}
                                               card={cardsCurrent}
                                />}
                            {addMode && <AddUpdateCard
                                createCard={createCard}
                                addUpdateOff={addUpdateOff}
                            />}


                            {
                                cards.cards[0]
                                    ? <CardsTable
                                        addUpdateOn={addUpdateOn}
                                        deleteModeOn={deleteModeOn}
                                        cards={cards.cards}
                                        userId={userId}
                                        // isLoading={status}
                                    />
                                    : <div className={styles.noItemText}>
                                        {
                                            cardQuestion
                                                ? <span>There is no сard with this question.</span>
                                                : <span>This pack is empty. Click add new card to fill this pack.</span>

                                        }
                                    </div>
                            }

                        </>}
                </div>
                <PaginationCardsContainer/>
            </div>
            <ErrorSnackbar/>
        </div>
    );
});

