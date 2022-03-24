import React, {useState} from 'react';
import style from '../InitCommonStyles.module.css';
import {Alert} from '@mui/material';
import {ErrorSnackbar} from '../../common/Error/ErrorSnackbar';
import {NavLink} from 'react-router-dom';
import {SIGN_IN_PATH} from '../../Routes';


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

    return <div className={style.initCmpnentWrapper}>
        <h1 className={style.title}>
            Playing cards
        </h1>
        <h3 className={style.subtitle}>Sign Up</h3>


        <div className={style.formBox}>

            <label className={style.loginLabel}>Email
                <input className={style.Input}
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
            </label>


            {emailError !== null && <span>
            <Alert severity="error">{emailError}</Alert>
            </span>}


            <label className={style.loginLabel}>Password
                <input className={style.Input}
                       type="password"
                       placeholder={''}
                       value={password}
                       name={'password'}
                       onChange={(e) => {
                           setPassword(e.target.value);
                           setPassError(null)
                       }}
                       onBlur={passwordBlurHandler}
                />
            </label>

            {passError !== null && <span>
            <Alert severity="error">{passError}</Alert>
            </span>}

            <label className={style.loginLabel}>Confirm password
                <input className={style.Input}
                       type="password"
                       placeholder={''}
                       value={repeatPassword}
                       name={'repeatPassword'}
                       onChange={(e) => {
                           setRepeatPassword(e.target.value);
                           setRepeatPasswordError(null)
                       }}
                       onBlur={rePasswordBlurHandler}
                />
            </label>

            {repeatPasswordError !== null && <span>
            <Alert severity="error">{repeatPasswordError}</Alert>
            </span>}
        </div>
        <button className={style.btnBlue}
            // style={{ width: "187px", marginBottom: 0, marginTop: 0}}
                onClick={registration}
                name={'Register'}
                type="submit">
            Sign Up!
        </button>
        <div>
            <NavLink to={SIGN_IN_PATH} className={style.linkBlue}>
                Sign In
            </NavLink>
        </div>

        <ErrorSnackbar/>
    </div>;
})


export default Register;
