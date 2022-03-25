import React from 'react';
import s from './ModalsCommonStyles.module.css';
import {useDispatch} from 'react-redux';
import {deletePack} from '../../BLL/packs/packs-reducer';
import {CardPacksType} from '../../DAL/packs-api';

type  DeletePackPropsType = {
    setDeleteMode: (value: boolean) => void
    pack: CardPacksType
}


export const DeletePack = React.memo((props: DeletePackPropsType) => {


    // const [name, setName] = useState<string>(props.pack.name);

    const dispatch = useDispatch()

    // const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    //     setName(e.currentTarget.value)
    // }


    const onSaveClick = () => {
        dispatch(deletePack(
            props.pack._id, props.pack.user_id
        ))
        props.setDeleteMode(false)
    }

    return (
        <div className={s.modal}>
            <div className={s.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={s.wrap}>
                    <div className={s.header}>
                        <h2 className={s.title}>Delete pack</h2>
                    </div>
                    <p className={s.deleteItemText}>Do you really want to remove the pack <b>"{props.pack.name}"</b> ?
                        All cards will be excluded from this course.</p>
                    <div className={s.wrapBtn}>
                        <button className={s.btnCancel} onClick={() => props.setDeleteMode(false)}>
                            Cancel
                        </button>
                        <button onClick={onSaveClick} className={s.deleteButton}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

