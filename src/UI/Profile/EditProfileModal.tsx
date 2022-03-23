import styles from './EditProfileModal.module.css';
import s from '../../UI/Modals/Learning/Learning.module.scss';
import React, {ChangeEvent, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {IAppStore} from '../../BLL/store/store';
import {FilledInput, FormControl, FormHelperText, Input, InputLabel, OutlinedInput} from '@mui/material';
import Box from '@mui/material/Box';

export const EditProfileModal = (props: {
    setEditProfileMode: (value: boolean) => void
    title: string
    onChangeProfileDataClick: (newName: string, avatar: string | ArrayBuffer | null) => void
}) => {

    const inRef = useRef<HTMLInputElement>(null)
    const avatar = useSelector<IAppStore, string | null>(state => state.profile.avatar)
    const [file64, setFile64] = useState<string | ArrayBuffer | null>(avatar ? avatar : null);
    const [title, setTitle] = useState(props.title)
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const upload = (e: ChangeEvent<HTMLInputElement>) => {

        const reader = new FileReader()

        //у таргета files всегда массив, даже если инпуту не поставлен multiply там всего 1 файл
        const newFile = e.target.files && e.target.files[0]

        if (newFile) {
            reader.onloadend = () => setFile64(reader.result);
            reader.readAsDataURL(newFile)
            // if (file64)  dispatch(changeProfilePhoto(file64))
        }
    }

    return (<div>
        <div className={s.modal}>
            <div className={s.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={s.wrap}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Personal information</h2>
                    </div>


                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                    >

                        <FormControl variant="standard">
                            {/*<InputLabel htmlFor="component-helper">Name</InputLabel>*/}
                            <Input
                                id="component-helper"
                                value={title}
                                // onChange={handleChange}
                                aria-describedby="component-helper-text"
                            />
                            <FormHelperText id="component-helper-text">
                                Here you can change your name
                            </FormHelperText>
                        </FormControl>


                    </Box>


                    {/*<input value={title}*/}
                    {/*       autoFocus*/}
                    {/*       onChange={onChangeTitleHandler}*/}
                    {/*/>*/}
                    <input type="file"
                           ref={inRef}
                           onChange={upload}
                           accept=".jpg, .jpeg, .png"
                    />

                    <div className={styles.wrapBtn}>

                        <button className={styles.btnCancel} onClick={() => props.setEditProfileMode(false)}>
                            Cancel
                        </button>

                        <button onClick={() => {
                            file64 && props.onChangeProfileDataClick(title, file64)
                            props.setEditProfileMode(false)

                        }}
                                className={styles.btnNext}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}