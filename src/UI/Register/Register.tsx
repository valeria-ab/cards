import React, {useState} from 'react';
import s from './Register.module.scss';
import {Alert} from '@mui/material';
import {ErrorSnackbar} from '../common/Error/ErrorSnackbar';
import {NavLink} from 'react-router-dom';
import {REGISTER_PATH, SIGN_IN_PATH} from '../Routes';


type RegisterPropsType = {
    registrationRequest: (email: string, password: string) => void
}

const Register = React.memo((props: RegisterPropsType) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<null | string>(null)
    const [passError, setPassError] = useState<null | string>(null)
    const [repeatPasswordError, setRepeatPasswordError] = useState<null | string>(null)


    const registration = () => {
        if (password === repeatPassword) {
            props.registrationRequest(email, password)
        }
    }

    const blurHandler = () => {
        const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (email.length === 0) {
            setEmailError('The field cannot be empty')
        } else if (!re.test(String(email).toLowerCase())) {
            setEmailError('Invalid Email');
        } else {
            setEmailError(null);
        }
    };
    const passwordBlurHandler = () => {
        if (password.length === 0) {
            setPassError('The field cannot be empty')
        } else if (password.length < 3) {
            setPassError('at least 3 characters')
        }
    }

    const rePasswordBlurHandler = () => {
        if (repeatPassword.length === 0) {
            setRepeatPasswordError('The field cannot be empty')
        } else if (repeatPassword.length < 3) {
            setRepeatPasswordError('at least 3 characters')
        }
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
                       onChange={(e) => {
                           setEmail(e.target.value);
                           setEmailError(null)
                       }}
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
                       onChange={(e) => {
                           setPassword(e.target.value);
                           setPassError(null)
                       }}
                       onBlur={passwordBlurHandler}
                /></div>
            {passError !== null && <span>
            <Alert severity="error">{passError}</Alert>
            </span>}

            <div className={s.InputWrapper}>
                <label className={s.loginLabel}>Confirm password</label>
                <input className={s.Input}
                       type="password"
                       placeholder={''}
                       value={repeatPassword}
                       name={'repeatPassword'}
                       onChange={(e) => {
                           setRepeatPassword(e.target.value);
                           setRepeatPasswordError(null)
                       }}
                       onBlur={rePasswordBlurHandler}
                /></div>
            {repeatPasswordError !== null && <span>
            <Alert severity="error">{repeatPasswordError}</Alert>
            </span>}
        </div>
        <div className={s.btnWrap}>
            {/*<button className={s.btnLeft} type="button">*/}
            {/*    Cancel*/}
            {/*</button>*/}
            <button className={s.btnRight}
                    onClick={registration}
                    name={'Register'}
                    type="submit">
                Sign Up!
            </button>
            <div>
                <NavLink to={SIGN_IN_PATH}>
                    Sign In
                </NavLink>
            </div>

        </div>
        <ErrorSnackbar/>
    </div>;
})


export default Register;
