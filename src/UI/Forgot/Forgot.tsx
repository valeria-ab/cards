import React, {ChangeEvent, useState} from 'react';
import {Link} from 'react-router-dom';
import styles from "./Forgot.module.css";
import {CheckEmail} from "./CheckEmail";
import {Alert} from "@mui/material";
import {ErrorSnackbar} from "../common/Error/ErrorSnackbar";

type ForgotPasswordPropsType = {
    setError: (value: string) => void
    forgotPasswordRequest: (value: string) => void
    isRequestSend: boolean
}
export const Forgot = React.memo((props: ForgotPasswordPropsType) => {

    const [valueInput, setValueInput] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const checkEmailValidity = (value: string) => {
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
          props.setError("Not valid email")
            return
        }
        props.forgotPasswordRequest(valueInput)

    }

    if (props.isRequestSend) return <CheckEmail/>

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

