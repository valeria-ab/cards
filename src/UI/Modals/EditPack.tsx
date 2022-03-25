import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './ModalsCommonStyles.module.css';
import {useDispatch} from "react-redux";
import {updatePack} from "../../BLL/packs/packs-reducer";
import {CardPacksType} from '../../DAL/packs-api';

type  EditPackPropsType = {
    setEditMode: (value: boolean) => void
    pack: CardPacksType
}


export const EditPack = React.memo((props: EditPackPropsType) => {

    const [name, setname] = useState<string>(props.pack.name);
    const dispatch = useDispatch()


    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setname(e.currentTarget.value)
    }

    const onSaveClick = () => {
        dispatch(updatePack({
            ...props.pack,
            name: name,
            user_id: props.pack.user_id,
        }))
        props.setEditMode(false)
    }

    return (
        <div className={s.modal}>
            <div className={s.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={s.wrap}>
                    <div className={s.header}>
                        <h2 className={s.title}>Edit pack name</h2>
                    </div>
                    <p className={s.text}>Pack name</p>
                    <input
                        type='text'
                        className={s.input}
                        value={name}
                        onChange={onChangeName}
                    />
                    <div className={s.wrapBtn}>
                        <button className={s.btnCancel} onClick={() => props.setEditMode(false)}>
                            Cancel
                        </button>
                        <button onClick={onSaveClick}
                                className={s.mainButton}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

