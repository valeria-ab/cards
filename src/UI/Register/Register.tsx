import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './Registration.module.css';
import { registrationTC } from "../../BLL/register/registerReducer";
import { IAppStore } from "../../BLL/store/store";
import { Navigate } from "react-router-dom";
import s from "./Register.module.scss";
import {Alert} from "@mui/material";
import {ErrorSnackbar} from "../Error/ErrorSnackbar";

//Add my branch
interface IRegisterProps {
}

const Register: React.FC<IRegisterProps> = ({ }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [emailError, serEmailError] = useState<null | string>(null)
    const dispatch = useDispatch()
    const isRegistration = useSelector<IAppStore, boolean>(state => state.register.isRegistration)


    const registration = () => {
        if (password === repeatPassword) {
            dispatch(registrationTC({ email, password }))
        }
    }

    const blurHandler = () => {
        const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!re.test(String(email).toLowerCase())) {
            serEmailError('Not valid email')
        } else {
            serEmailError(null)
        }
    }

    if (isRegistration) {
        return <Navigate to={'/login'} />
    }

    return <div className={s.Register}>
        <h1 className={s.title}>
            It-incubator
        </h1>
        <h3 className={s.subtitle}>Sign Up</h3>
        <div className={s.formBox}>
        <div className={s.InputWrapper}>
            <label className={s.loginLabel}>Email</label>
            <input className={s.Input}
                type="text"
                placeholder={''}
                value={email}
                name={'email'}
                onChange={(e) => { setEmail(e.target.value) }}
                onBlur={blurHandler}
            />

        </div>
        {emailError !== null && <span>
            <Alert severity="error">{emailError}</Alert>
            </span>}
        <div className={s.InputWrapper}>
            <label className={s.loginLabel}>Password</label>
            <input className={s.Input}
                type="password"
                placeholder={''}
                value={password}
                name={'password'}
                onChange={(e) => { setPassword(e.target.value) }}
            /></div>

        <div className={s.InputWrapper}>
            <label className={s.loginLabel}>Confirm password</label>
            <input className={s.Input}
                type="password"
                placeholder={''}
                value={repeatPassword}
                name={'repeatPassword'}
                onChange={(e) => { setRepeatPassword(e.target.value) }}
            /></div>
            </div>
            <div className={s.btnWrap}>
            <button className={s.btnLeft} type="button" >
                Cancel
            </button>
            <button className={s.btnRight} 
                onClick={registration}
                name={'Register'}
                type="submit"> 
            Register
            </button>
            </div>
        <ErrorSnackbar/>
    </div>;
};

export default Register;
