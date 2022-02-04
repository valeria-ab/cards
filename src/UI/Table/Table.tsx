import React, {useEffect, useState} from 'react';
import s from './Table.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../BLL/store/store';
import {cardPacksType} from '../../DAL/Packs-api';
import {EditPack} from '../Modals/Edit/EditPack';
import {Delete} from '../Modals/Delete/Delete';
import {Add} from '../Modals/Add/Add';
import {PaginationPacksContainer} from '../PacksList/Pagination/PaginationPacksContainer';
import Search from '../PacksList/Search/Search';
import {ErrorSnackbar} from '../Error/ErrorSnackbar';
import {Learn} from '../PacksList/Learn/Learn';
import {QuestionModal} from '../PacksList/Learn/QuestionModal';
import {getCardsTC} from '../../BLL/cards/cards-reducer';
import {CardResponseType} from '../../DAL/CardsAPI';
import {NavLink, useParams} from 'react-router-dom';
import {getPacksTC} from '../../BLL/packs/packs-reducer';

type  CardsPropsType = {
    onClickCardsHandler: (id: string) => void
    isfromProfile: boolean
}


export const Table = React.memo((props: CardsPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [deleteMode, setDeleteMode] = useState<boolean>(false);
    const [addMode, setAddMode] = useState<boolean>(false);
    const [learnMode, setLearnMode] = useState<boolean>(false);
    const [questionMode, setQuestionMode] = useState<boolean>(false);
    const [card, setCard] = useState<CardResponseType>({} as CardResponseType);
    const dispatch = useDispatch()

    const cards = useSelector<IAppStore, CardResponseType[]>(state => state.cardsReducer.cards)

    const getCard = (cards: CardResponseType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            }
            , {sum: 0, id: -1});
        console.log('test: ', sum, rand, res)

        return cards[res.id + 1];
    }

    // конкретный пак с карточками которые можно учить
    const [pack, setPack] = useState<cardPacksType | null>(null);


    //список всех паков
    const cardPacks = useSelector<IAppStore, cardPacksType[]>((state) => state.packs.cardPacks);


    const id = useSelector<IAppStore, string>((state) => state.profile._id);


    const editModeOn = (pack: cardPacksType) => {
        setPack(pack)
        setEditMode(true)

    }
    const editModeOff = () => {
        setEditMode(false)
    }


    const deleteModeOn = (pack: cardPacksType) => {
        setPack(pack)
        setDeleteMode(true)

    }
    const deleteModeOff = () => {
        setDeleteMode(false)
    }

    const addModeOn = () => {
        setAddMode(true)

    }
    const addModeOff = () => {
        setAddMode(false)
    }

    const learnModeOn = (pack: cardPacksType) => {
        setPack(pack)
        setLearnMode(true)

    }
    const learnModeOff = () => {
        setLearnMode(false)
        setQuestionMode(false)
    }

    const questionModeOn = (pack: cardPacksType) => {
        setPack(pack)
        setQuestionMode(true)
        setCard(getCard(cards))
    }
    const questionModeOff = () => {
        setQuestionMode(false)
    }

    const onLearnButtonClick = (pack: cardPacksType) => {
        questionModeOn(pack)
        dispatch(getCardsTC({ cardsPack_id: pack._id }))
    }

    useEffect(() => {
        props.isfromProfile
        ? dispatch(getPacksTC({user_id: id}))
       : dispatch(getPacksTC())
    }, [])

    return (
        <div className={s.table}>
            {addMode && <Add addModeOff={addModeOff}/>}
            {pack && editMode && <EditPack pack={pack} editModeOff={editModeOff}/>}
            {pack && deleteMode && <Delete pack={pack} deleteModeOff={deleteModeOff}/>}
            {pack && questionMode && <QuestionModal card={card} pack={pack} learnModeOn={() => learnModeOn(pack)} questionModeOff={questionModeOff}/>}
            {pack && learnMode  && <Learn card={card} pack={pack} learnModeOff={learnModeOff} questionModeOn={() => questionModeOn(pack)}/>}


            <h2 className={s.Table__name}>Packs List</h2>
            <div className={s.Table__top}>
                <Search/>
                <button className={s.add} onClick={addModeOn}> Add Pack</button>
            </div>
            <div className={s.tableMain}>
                <table className={s.tableWrapper}>
                    <thead className={s.tableHeader}>
                    <tr className={s.table__headRow}>
                        <th className={s.table__head}>Name</th>
                        <th className={s.table__head}>Cards</th>
                        <th className={s.table__head}>Last Updated</th>
                        <th className={s.table__head}>Created by</th>
                        <th className={s.table__head}>Actions</th>
                    </tr>
                    </thead>
                    <tbody className={s.table__main}>
                    {cardPacks.map((pack) => {

                        return (<tr key={pack._id} className={s.table__row}>
                            <td className={s.table__data}
                                onClick={() => {
                                    props.onClickCardsHandler(pack._id)
                                }}>{pack.name}</td>
                            <td className={s.table__data}>{pack.cardsCount}</td>
                            <td className={s.table__data}>{pack.updated}</td>
                            <td className={s.table__data}>{pack.created}</td>
                            <td className={s.table__data}>
                                {id === pack.user_id ?
                                    <div className={s.buttons}>
                                        <button className={s.delButtonWrapper}
                                                onClick={() => deleteModeOn(pack)}>Delete
                                        </button>
                                        <button className={s.buttonWrapper}
                                                onClick={() => editModeOn(pack)}>Edit
                                        </button>
                                        {/*<NavLink to={`/learn/${pack._id}`}>*/}
                                            <button className={s.buttonWrapper}
                                                    onClick={() => onLearnButtonClick(pack)}>Learn
                                            </button>
                                        {/*</NavLink>*/}

                                    </div>
                                     :      //<NavLink to={`/learn/${pack._id}`}>
                                        <button className={s.buttonWrapper}
                                                onClick={() => onLearnButtonClick(pack)}>Learn
                                        </button>
                                    // </NavLink>
                                }
                            </td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
            <PaginationPacksContainer/>
            <ErrorSnackbar/>
        </div>
    );

});