import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './Delete.module.scss';
import {useDispatch} from "react-redux";
import {cardPacksType} from "../../../DAL/Packs-api";
import {deletedPacks, updatePacks} from '../../../BLL/packs/packs-reducer';

type  DeletePackPropsType = {
    deleteModeOff: () => void
    pack: cardPacksType
}


export const Delete = React.memo((props: DeletePackPropsType) => {


    const [name, setName] = useState<string>(props.pack.name);

    const dispatch = useDispatch()

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    useEffect(() => {
        const body = document.querySelector('body');
        if (body) body.style.overflow = 'hidden';
        return () => {
            if (body) body.style.overflow = 'auto';
        };
    }, []);


    const onSaveClick = () => {
        dispatch(deletedPacks(
            props.pack._id, props.pack.user_id
        ))
        props.deleteModeOff()
    }

    return (
        <div className={styles.modal}>
            <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={styles.wrap}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Delete pack name</h2>
                    </div>
                    <p className={styles.text}>Pack name {props.pack.name}</p>
                    <div className={styles.wrapBtn}>
                        <button className={styles.btnCancel} onClick={props.deleteModeOff}>
                            Cancel
                        </button>
                        <button onClick={onSaveClick} className={styles.btnSave}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

