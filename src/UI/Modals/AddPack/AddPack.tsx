import React, {ChangeEvent, useState} from 'react';
import styles from './Add.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {createPack, setCardsPacksCountFromRangeAC} from '../../../BLL/packs/packs-reducer';
import {IAppStore} from "../../../BLL/store/store";

type  AddPackPropsType = {
    setAddMode: (value: boolean) => void
}


export const AddPack = React.memo((props: AddPackPropsType) => {

    const [name, setName] = useState<string>("");

    const dispatch = useDispatch()
    const currentUserID = useSelector<IAppStore, string>((state) => state.profile._id);


    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const onSaveClick = () => {
        dispatch(createPack(name, currentUserID))
        dispatch(setCardsPacksCountFromRangeAC([0,1000]))
        props.setAddMode(false)
    }

    return (
        <div className={styles.modal}>
            <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={styles.wrap}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Add pack name</h2>
                    </div>
                    <p className={styles.text}>Pack name</p>
                    <input
                        type='text'
                        className={styles.input}
                        value={name}
                        onChange={onChangeName}
                    />
                    <div className={styles.wrapBtn}>
                        <button className={styles.btnCancel} onClick={() => props.setAddMode(false)}>
                            Cancel
                        </button>
                        <button onClick={onSaveClick} className={styles.btnSave}>
                            Add pack
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

