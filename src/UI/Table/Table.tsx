import React, {useState} from 'react';
import s from "./Table.module.scss";
import {useSelector} from "react-redux";
import {IAppStore} from "../../BLL/store/store";
import {cardPacksType} from "../../DAL/Packs-api";
import {EditPack} from "../Modals/Edit/EditPack";
import {Delete} from "../Modals/Delete/Delete";
import {Add} from "../Modals/Add/Add";




type  CardsPropsType = {
    onClickCardsHandler: (id: string) => void
}


export const Table = React.memo((props: CardsPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [deleteMode, setDeleteMode] = useState<boolean>(false);
    const [addMode, setAddMode] = useState<boolean>(false);


    // const [name, setName] = useState<string>("");

    const [pack, setPack] = useState<cardPacksType | null>(null);


    const cardPacks = useSelector<IAppStore, cardPacksType[]>((state) => state.packs.cardPacks);
    

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


    return (
        <div className={s.table}>
            {pack && editMode && <EditPack pack={pack} editModeOff={editModeOff}/>}
            {pack && deleteMode && <Delete pack={pack} deleteModeOff={deleteModeOff}/>}
            {addMode && <Add addModeOff={addModeOff}/>}
            {/*{cardMode &&*/}
            {/*<Cards tableOffHandler={props.tableOffHandler} cardsModeOff={cardsModeOff}/>}*/}

            <button className={s.add} onClick={addModeOn}> Add Pack</button>
            <div className={s.tableMain}>
            <table className={s.tableWrapper}>
            <thead className={s.tableHeader}>
                    <tr className={s.table__headRow}>
                        <th className={s.table__head}>Name</th>
                        <th className={s.table__head}>Cards </th>
                        <th className={s.table__head}>Last Updated</th>
                        <th className={s.table__head}>Created by</th>
                        <th className={s.table__head}>Actions</th>
                    </tr>
                </thead>
            <tbody className={s.table__main}>
                {cardPacks.map((pack) => {

                    return (<tr key={pack._id} className={s.table__row}>
                        <td className={s.table__data}
                            onClick={()=> {props.onClickCardsHandler(pack._id)}}>{pack.name}</td>
                        <td className={s.table__data}>{pack.cardsCount}</td>
                        <td className={s.table__data}>{pack.updated}</td>
                        <td className={s.table__data}>{pack.created}</td>
                        <td className={s.table__data}>
                            <td className={s.buttons}>
                                <button  className={s.delButtonWrapper} onClick={() => deleteModeOn(pack)}>Delete</button>
                                <button   className={s.buttonWrapper}
                                    onClick={() => editModeOn(pack)}>Edit
                                </button>
                            </td>
                        </td>
                    </tr>)
                })}
            </tbody>
            </table>
            </div>
        </div>
    );
});

