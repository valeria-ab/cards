import React, {ChangeEvent, useState} from 'react';
import {Link} from 'react-router-dom';
import {CheckEmail} from './CheckEmail';
import {Alert} from '@mui/material';
import {ErrorSnackbar} from '../../common/Error/ErrorSnackbar';
import style from '../InitCommonStyles.module.css';


type ForgotPasswordPropsType = {
    setError: (value: string) => void
    forgotPasswordRequest: (value: string) => void
    isRequestSend: boolean
}
export const Forgot = React.memo((props: ForgotPasswordPropsType) => {

    const [valueInput, setValueInput] = useState<string>('');
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
            setError('Not valid email')
            props.setError('Not valid email')
            return
        }
        props.forgotPasswordRequest(valueInput)

    }

    if (props.isRequestSend) return <CheckEmail/>

    return (
        // <div className={styles.main}>
        <div className={style.initCmpnentWrapper}>
            {/*<div className={styles.forgot__body}>*/}
                <h2 className={style.title}>Playing cards</h2>
                <h3 className={style.subtitle}>Forgot your password?</h3>

                <div className={style.formBox}>

                    <label className={style.loginLabel} style={{paddingBottom: "20px"}}>
                        Email
                        <input placeholder=""
                               type="text"
                               value={valueInput}
                               onChange={onInputChange}
                               // className={styles.forgot__input}/>
                               className={style.Input}/>
                    </label>


                    {error ?
                        <Alert severity="error">{error}</Alert> : null}
                    <div className={style.textLight}>
                        Enter your email address and we
                        will
                        send you
                        further instructions
                    </div>
                </div>

                <button className={style.btnBlue}
                        onClick={onClickHandler}>Send Instructions
                </button>
            <p className={style.textLight}>Did you remember your password?</p>
            <div>
                <Link to={'/login'} className={style.linkBlue}>Try logging in</Link>
            </div>

            {/*</div>*/}

            <ErrorSnackbar/>
        </div>
    );
});

