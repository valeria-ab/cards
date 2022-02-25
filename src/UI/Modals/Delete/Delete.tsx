import React, {useEffect} from 'react';
import styles from './Delete.module.scss';
import {useDispatch} from "react-redux";
import {deletePack} from '../../../BLL/packs/packs-reducer';
import {CardPacksType} from '../../../DAL/packs-api';

type  DeletePackPropsType = {
    deleteModeOff: () => void
    pack: CardPacksType
}


export const Delete = React.memo((props: DeletePackPropsType) => {


    // const [name, setName] = useState<string>(props.pack.name);

    const dispatch = useDispatch()

    // const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    //     setName(e.currentTarget.value)
    // }


    const onSaveClick = () => {
        dispatch(deletePack(
            props.pack._id, props.pack.user_id
        ))
        props.deleteModeOff()
    }

    return (
        <div className={styles.modal}>
            <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={styles.wrap}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Delete pack</h2>
                    </div>
                    <p className={styles.text}>Do you really want to remove the pack "{props.pack.name}" ?
                        All cards will be excluded from this course.</p>
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

