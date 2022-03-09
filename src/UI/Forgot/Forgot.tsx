import React, {ChangeEvent, useState} from 'react';
import {Link} from 'react-router-dom';
import styles from "./Forgot.module.css";
import {useDispatch, useSelector} from "react-redux";
import {forgotPasswordTC} from "../../BLL/forgot/forgot-reducer";
import {IAppStore} from "../../BLL/store/store";
import {CheckEmail} from "./CheckEmail";
import {Alert} from "@mui/material";
import {ErrorSnackbar} from "../common/Error/ErrorSnackbar";
import {setErrorAC} from '../../BLL/app/app-reducer';

export const Forgot = React.memo(() => {

    const dispatch = useDispatch()
    const [valueInput, setValueInput] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const isRequestSend = useSelector<IAppStore, boolean>(state => state.forgot.isRequestSend)

    const checkEmailValidity = (value: string) => {  //валидация емайл
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return reg.test(value);
    };


    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setValueInput(e.currentTarget.value)
    }


    const onClickHandler = () => {
        if (!checkEmailValidity(valueInput)) {
            setError("Not valid email")
            dispatch(setErrorAC("Not valid email"))
            return
        }
        dispatch(forgotPasswordTC(valueInput))

    }

    if (isRequestSend) return <CheckEmail/>

    return (
        <div className={styles.main}>
            <div className={styles.forgot}>
                <div className={styles.forgot__body}>
                    <h2 className={styles.forgot__title}>It-incubator</h2>
                    <div className={styles.forgot__subtitle}>Forgot your password?</div>
                    <label className={styles.loginLabel}>Email</label>
                    <input placeholder="" type="text" value={valueInput}
                           onChange={onInputChange}
                           className={styles.forgot__input}/>
                    {error ?
                        <Alert severity="error">{error}</Alert> : null}
                    <div className={styles.forgot__info}>Enter your email address and we
                        will
                        send you
                        further instructions
                    </div>
                    <button className={styles.forgot__button}
                            onClick={onClickHandler}>Send Instructions
                    </button>
                    <Link to={"/login"} className={styles.forgot__login}>Try logging
                        in</Link>
                </div>
            </div>
            <ErrorSnackbar/>
        </div>
    );
});

