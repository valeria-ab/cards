import React, {useState} from 'react';
import s from './Table.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../BLL/store/store';
import {EditPack} from '../Modals/Edit/EditPack';
import {Delete} from '../Modals/Delete/Delete';
import {AddPack} from '../Modals/Add/Add';
import {PaginationPacksContainer} from '../PacksList/Pagination/PaginationPacksContainer';
import Search from '../PacksList/Search/Search';
import {ErrorSnackbar} from '../Error/ErrorSnackbar';
import {getCardsTC, setCurrentPackAC} from '../../BLL/cards/cards-reducer';
import {CardPacksType} from '../../DAL/packs-api';
import {NavLink} from 'react-router-dom';



export const Table = React.memo(() => {
    // console.log("я табле я отрисовался")
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


    const editModeOn = (pack: CardPacksType) => {
        setPack(pack)
        setEditMode(true)

    }
    const editModeOff = () => {
        setEditMode(false)
    }


    const deleteModeOn = (pack: CardPacksType) => {
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


    const onLearnButtonClick = (pack: CardPacksType) => {
        dispatch(setCurrentPackAC(pack))
        dispatch(getCardsTC({cardsPack_id: pack._id}))
    }


    if (isLoading) {
        return <div className={s.table}>loading...</div>
    }
    return (
        <div className={s.table}>
            {addMode && <AddPack addModeOff={addModeOff}/>}
            {pack && editMode && <EditPack pack={pack} editModeOff={editModeOff}/>}
            {pack && deleteMode && <Delete pack={pack} deleteModeOff={deleteModeOff}/>}


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
                            {/*<NavLink to={*/}
                            {/*    layout === 'packs-list'*/}
                            {/*        ? `/packs-list/${pack._id}`*/}
                            {/*        : `/profile/${pack._id}`*/}
                            {/*}>*/}
                            {/*    <td className={s.table__data}>{pack.name}</td>*/}
                            {/*</NavLink>*/}
                            <NavLink to={`/pack/${pack._id}`}>
                                <td className={s.table__data}>{pack.name}</td>
                            </NavLink>
                            <td className={s.table__data}>{pack.cardsCount}</td>
                            <td className={s.table__data}>{pack.updated}</td>
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