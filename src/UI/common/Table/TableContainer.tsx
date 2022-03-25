import React, {useCallback, useEffect, useState} from 'react';
import s from './Table.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';
import {EditPack} from '../../Modals/EditPack';
import {DeletePack} from '../../Modals/DeletePack';
import {AddPack} from '../../Modals/AddPack';
import {CardPacksType, SortingPacksType} from '../../../DAL/packs-api';
import {Table} from './Table';
import {getPacksTC} from '../../../BLL/packs/packs-reducer';
import SearchPacksContainer from '../Search/SearchPacksContainer';
import {PaginationPacksContainer} from '../Pagination/PaginationPacksContainer';


export const TableContainer = React.memo(() => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [deleteMode, setDeleteMode] = useState<boolean>(false);
    const [addMode, setAddMode] = useState<boolean>(false);
    const isInitialized = useSelector<IAppStore, boolean>(state => state.app.isInitialized)
    const dispatch = useDispatch()

    // const isLoading = useSelector<IAppStore, boolean>(state => state.app.isLoading)

    const [pack, setPack] = useState<CardPacksType | null>(null);
    const sortingBy = useSelector<IAppStore, SortingPacksType | ''>(state => state.packs.sortingBy)
    const page = useSelector<IAppStore, number>(state => state.packs.page)
    const packName = useSelector<IAppStore, string>(state => state.packs.packName)
    const cardsValuesFromRange = useSelector<IAppStore, Array<number>>((state) => state.packs.cardsValuesFromRange);
    const pageCount = useSelector<IAppStore, number>((state) => state.packs.pageCount);

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
        // dispatch(setCurrentPackAC(pack))


        // dispatch(getCardsTC({cardsPack_id: pack._id}))
    }, [])


    return (<div className={s.table}>
            <div className={s.Table__top}>
                <SearchPacksContainer/>
                <button className={s.add} onClick={() => setAddMode(true)}> Add new pack</button>
            </div>
            {addMode && <AddPack setAddMode={setAddMode}/>}
            {pack && editMode && <EditPack pack={pack} setEditMode={setEditMode}/>}
            {pack && deleteMode && <DeletePack pack={pack} setDeleteMode={setDeleteMode}/>}

            {packsList[0]
                ? <Table packsList={packsList}
                         userId={userId}
                         deleteModeOn={deleteModeOn}
                         editModeOn={editModeOn}
                />
                : <div className={s.noItemText}>There are no packs. Click add new pack to create.</div>
            }
            {/*{packsList[0] && <PaginationPacksContainer/>}*/}
        </div>

    )

})