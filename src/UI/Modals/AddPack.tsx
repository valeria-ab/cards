import React, {ChangeEvent, useState} from 'react';
import s from './ModalsCommonStyles.module.css';
import {useDispatch, useSelector} from "react-redux";
import {createPack, setCardsPacksCountFromRangeAC} from '../../BLL/packs/packs-reducer';
import {IAppStore} from "../../BLL/store/store";

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
        props.setAddMode(false)
    }

    return (
        <div className={s.modal}>
            <div className={s.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={s.wrap}>
                    <div className={s.header}>
                        <h2 className={s.title}>Add pack name</h2>
                    </div>
                    <p className={s.text}>Pack name</p>
                    <input
                        type='text'
                        className={s.input}
                        value={name}
                        onChange={onChangeName}
                    />
                    <div className={s.wrapBtn}>
                        <button className={s.btnCancel} onClick={() => props.setAddMode(false)}>
                            Cancel
                        </button>
                        <button onClick={onSaveClick}
                                className={s.mainButton}>
                            Add pack
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

