import React from 'react'
import s from './CommonInput.module.scss'
import TextField from '@mui/material/TextField';


export const CommonInput = (props) => {
    return (
        <div className={s.CommonInput}>
            <TextField id={props.id} label={props.label} type={props.type} variant="standard" className={s.input} />
        </div>
    )
}

export default CommonInput;