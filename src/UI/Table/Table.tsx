import React, {useEffect, useState} from 'react';
import s from './Table.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../BLL/store/store';
import {EditPack} from '../Modals/Edit/EditPack';
import {Delete} from '../Modals/Delete/Delete';
import {AddPack} from '../Modals/Add/Add';
import {PaginationPacksContainer} from '../PacksList/Pagination/PaginationPacksContainer';
import {ErrorSnackbar} from '../Error/ErrorSnackbar';
import {getCardsTC, setCurrentPackAC} from '../../BLL/cards/cards-reducer';
import {CardPacksType, SortingPacksType} from '../../DAL/packs-api';
import {NavLink} from 'react-router-dom';
import arrow from '../../image/vector down arrow icon.png';
import {getPacksTC, setSortPacksValueAC} from '../../BLL/packs/packs-reducer';
import SearchPacksContainer from '../PacksList/Search/SearchPacksContainer';


export const Table = React.memo(() => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [deleteMode, setDeleteMode] = useState<boolean>(false);
    const [addMode, setAddMode] = useState<boolean>(false);

    const dispatch = useDispatch()

    const layout = useSelector<IAppStore, 'profile' | 'packs-list'>(state => state.cards.layout)

    const isLoading = useSelector<IAppStore, boolean>(state => state.app.isLoading)

    const [pack, setPack] = useState<CardPacksType | null>(null);

    //список всех паков
    const cardPacks = useSelector<IAppStore, CardPacksType[]>((state) => state.packs.cardPacks);

    const userId = useSelector<IAppStore, string>((state) => state.profile._id);

    const styles = [{height: '15px'}, {height: '15px', transform: 'rotate(180deg)'}]

    const editModeOn = (pack: CardPacksType) => {
        setPack(pack)
        setEditMode(true)

    }

    const deleteModeOn = (pack: CardPacksType) => {
        setPack(pack)
        setDeleteMode(true)

    }

    const onLearnButtonClick = (pack: CardPacksType) => {
        dispatch(setCurrentPackAC(pack))
        dispatch(getCardsTC({cardsPack_id: pack._id}))
    }


    if (isLoading) {
        return <div className={s.table}>loading...</div>
    }
    return (
        <div className={s.table}>
            {addMode && <AddPack setAddMode={setAddMode}/>}
            {pack && editMode && <EditPack pack={pack} setEditMode={setEditMode}/>}
            {pack && deleteMode && <Delete pack={pack} setDeleteMode={setDeleteMode}/>}


            <h2 className={s.Table__name}>Packs List</h2>
            <div className={s.Table__top}>
                <SearchPacksContainer/>
                <button className={s.add} onClick={() => setAddMode(true)}> Add Pack</button>
            </div>
            <div className={s.tableMain}>
                <table className={s.tableWrapper}>
                    <thead className={s.tableHeader}>
                    <tr className={s.table__headRow}>
                        <th className={s.table__head}>
                            Name
                            {/*<span>*/}
                            {/*   <button disabled={true} onClick={() => dispatch(setSortPacksValueAC('0name'))}>*/}
                            {/*       <img src={arrow}*/}
                            {/*            style={styles[0]}/>*/}
                            {/*   </button>*/}
                            {/*   <button onClick={() => dispatch(setSortPacksValueAC('1name'))}>*/}
                            {/*       <img src={arrow}*/}
                            {/*            style={styles[1]}/>*/}
                            {/*   </button>*/}

                            {/*</span>*/}
                        </th>
                        <th className={s.table__head}>
                            Cards
                            {/*<span>*/}
                            {/*   <button onClick={() => dispatch(setSortPacksValueAC('0cardsCount'))}>*/}
                            {/*       <img src={arrow}*/}
                            {/*            style={styles[0]}/>*/}
                            {/*   </button>*/}
                            {/*   <button onClick={() => dispatch(setSortPacksValueAC('1cardsCount'))}>*/}
                            {/*       <img src={arrow}*/}
                            {/*            style={styles[1]}/>*/}
                            {/*   </button>*/}

                            {/*</span>*/}
                            {/*<span onClick={() => {*/}
                            {/*    setArrowUp(!isArrowUp)*/}
                            {/*    isArrowUp*/}
                            {/*        ? dispatch(setSortPacksValueAC('1cardsCount'))*/}
                            {/*        : dispatch(setSortPacksValueAC('0cardsCount'))*/}
                            {/*}*/}
                            {/*}>*/}
                            {/*    <img src={arrow} style={isArrowUp ? styles[1] : styles[0]}/>*/}
                            {/*</span>*/}
                        </th>
                        <th className={s.table__head}>
                            Last Updated
                            {/*<span>*/}
                            {/*   <button onClick={() => dispatch(setSortPacksValueAC('0updated'))}>*/}
                            {/*       <img src={arrow}*/}
                            {/*            style={styles[0]}/>*/}
                            {/*   </button>*/}
                            {/*   <button onClick={() => dispatch(setSortPacksValueAC('1updated'))}>*/}
                            {/*       <img src={arrow}*/}
                            {/*            style={styles[1]}/>*/}
                            {/*   </button>*/}
                            {/*</span>*/}
                        </th>
                        <th className={s.table__head}>Created by</th>
                        <th className={s.table__head}>Actions</th>
                    </tr>
                    </thead>
                    <tbody className={s.table__main}>
                    {cardPacks.map((pack) => {

                        return (<tr key={pack._id} className={s.table__row}>
                            <NavLink to={`/pack/${pack._id}`}>
                                <td className={s.table__data}>{pack.name}</td>
                            </NavLink>
                            <td className={s.table__data}>{pack.cardsCount}</td>
                            <td className={s.table__data}>{pack.updated.slice(0, 10)}</td>
                            <td className={s.table__data}>{pack.user_name}</td>
                            <td className={s.table__data}>
                                {userId === pack.user_id ?
                                    <div className={s.buttons}>
                                        <button className={s.delButtonWrapper}
                                                onClick={() => deleteModeOn(pack)}>Delete
                                        </button>
                                        <button className={s.buttonWrapper}
                                                onClick={() => editModeOn(pack)}>Edit
                                        </button>
                                        <NavLink to={`/learn/${pack._id}`}>
                                            {
                                                pack.cardsCount > 0 && <button className={s.buttonWrapper}
                                                                               onClick={() => onLearnButtonClick(pack)}
                                                >Learn
                                                </button>
                                            }
                                        </NavLink>

                                    </div>
                                    : pack.cardsCount > 0 &&
                                    <NavLink to={`/learn/${pack._id}`}>
                                        <button className={s.buttonWrapper}
                                                onClick={() => onLearnButtonClick(pack)}>Learn
                                        </button>
                                    </NavLink>
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