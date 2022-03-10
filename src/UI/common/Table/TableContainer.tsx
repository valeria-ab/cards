import React, {useCallback, useState} from 'react';
import s from './Table.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';
import {EditPack} from '../../Modals/Edit/EditPack';
import {Delete} from '../../Modals/Delete/Delete';
import {AddPack} from '../../Modals/AddPack/AddPack';
import {setCurrentPackAC} from '../../../BLL/cards/cards-reducer';
import {CardPacksType} from '../../../DAL/packs-api';
import {Table} from './Table';


export const TableContainer = React.memo(() => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [deleteMode, setDeleteMode] = useState<boolean>(false);
    const [addMode, setAddMode] = useState<boolean>(false);

    const dispatch = useDispatch()

    const isLoading = useSelector<IAppStore, boolean>(state => state.app.isLoading)

    const [pack, setPack] = useState<CardPacksType | null>(null);

    //список всех паков
    const packsList = useSelector<IAppStore, CardPacksType[]>((state) => state.packs.cardPacks);

    const userId = useSelector<IAppStore, string>((state) => state.profile._id);


    const editModeOn = useCallback((pack: CardPacksType) => {
        setPack(pack)
        setEditMode(true)
    }, [])

    const deleteModeOn = useCallback((pack: CardPacksType) => {
        setPack(pack)
        setDeleteMode(true)
    }, [])

    const onLearnButtonClick = useCallback((pack: CardPacksType) => {
        dispatch(setCurrentPackAC(pack))
        // dispatch(getCardsTC({cardsPack_id: pack._id}))
    }, [])


    // if (isLoading) {
    //     return <div className={s.table}>loading...</div>
    // }
    return (<div className={s.table}>
            <div className={s.Table__top}>
                <button className={s.add} onClick={() => setAddMode(true)}> Add Pack</button>
            </div>
            {addMode && <AddPack setAddMode={setAddMode}/>}
            {pack && editMode && <EditPack pack={pack} setEditMode={setEditMode}/>}
            {pack && deleteMode && <Delete pack={pack} setDeleteMode={setDeleteMode}/>}

            <Table packsList={packsList}
                   onLearnButtonClick={onLearnButtonClick}
                   userId={userId}
                   deleteModeOn={deleteModeOn}
                   editModeOn={editModeOn}
            />
        </div>

    )

})