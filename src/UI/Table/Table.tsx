import React, {useState} from 'react';
import styles from "./Table.module.scss";
import {useSelector} from "react-redux";
import {IAppStore} from "../../BLL/store/store";
import {cardPacksType} from "../../DAL/Packs-api";
import {EditPack} from "../Modals/Edit/EditPack";
import {Delete} from "../Modals/Delete/Delete";
import {Add} from "../Modals/Add/Add";

export const Table = React.memo(() => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [deleteMode, setDeleteMode] = useState<boolean>(false);
    const [addMode, setAddMode] = useState<boolean>(false);

    // const [name, setName] = useState<string>("");
    // const [packID, setPackID] = useState<string>("");

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


        <div className={styles.table}>
            {pack && editMode && <EditPack pack={pack} editModeOff={editModeOff}/>}
            {pack && deleteMode && <Delete pack={pack} deleteModeOff={deleteModeOff}/>}
            {addMode && <Add addModeOff={addModeOff}/>}

            <button className={styles.add} onClick={addModeOn}> Add Pack</button>
            <div className={styles.header}>
                <div className={styles.header__item}>Name</div>
                <div className={styles.header__item}>Cards</div>
                <div className={styles.header__item}>Last Updated</div>
                <div className={styles.header__item}>Created by</div>
                <div className={styles.header__item}>Actions</div>
            </div>
            <div className={styles.table__main}>
                {cardPacks.map((pack) => {

                    return (<div key={pack._id} className={styles.table__row}>
                        <div className={styles.table__name}>{pack.name}</div>
                        <div className={styles.table__cards}>{pack.cardsCount}</div>
                        <div className={styles.table__updated}>{pack.updated}</div>
                        <div className={styles.table__created}>{pack.created}</div>
                        <div className={styles.table__actions}>
                            <div className="buttons">
                                <button onClick={() => deleteModeOn(pack)}>Delete</button>
                                <button
                                    onClick={() => editModeOn(pack)}>Edit
                                </button>
                            </div>
                        </div>
                    </div>)
                })}
            </div>


        </div>
    );
});

