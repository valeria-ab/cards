import React, {FormEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import {IAppStore} from '../../BLL/store/store';
import {FORGOT_PATH, REGISTER_PATH} from '../Routes';
import s from './LogIn.module.scss';
import {Alert} from '@mui/material';
import {ErrorSnackbar} from '../Error/ErrorSnackbar';
import {signIn} from '../../BLL/login/login-reducer';

const Login = React.memo(() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const isInitialized = useSelector<IAppStore, boolean>((state) => state.app.isInitialized);
    const error = useSelector<IAppStore, string>((state) => state.login.error);
    const isLoading = useSelector<IAppStore, boolean>((state) => state.app.isLoading);
    const dispatch = useDispatch();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(signIn({email, password, rememberMe}));
    };

    if (isInitialized) {
        return <Navigate to={'/profile'}/>
    }

    if (isLoading) {
        return <div className={s.signIn}>loading...</div>
    }

    return (
        <div className={s.signIn}>
            <h2 className={s.title}>It-incubator</h2>
            <h3 className={s.subtitle}>Sign In</h3>
            <form onSubmit={handleSubmit}>
                <div className={s.formBox}>
                    <label className={s.loginLabel}>Email
                        <div className={s.InputWrapper}>
                            <input
                                className={s.Input}
                                type="email"
                                name="email"
                                onChange={(e) => setEmail(e.currentTarget.value)}
                            />
                        </div>
                    </label>
                </div>
                <div className={s.PasswordWrapper}>
                    <label className={s.loginLabel}>Password
                        <div className={s.InputWrapper}>
                            <input
                                className={s.Input}
                                type="password"
                                name="password"
                                onChange={(e) => setPassword(e.currentTarget.value)}
                            />
                        </div>
                    </label>
                </div>
                {error && (
                    <span>
            <Alert severity="error">{error}</Alert>
          </span>
                )}
                <div className={s.CheckBoxWrapper}>
                    <div className={s.CheckBox}>
                        <label className={s.CheckBoxLabel}>
                            <input
                                type="checkbox"
                                name="rememberMe"
                                onChange={(e) => setRememberMe(e.currentTarget.checked)}
                            />
                            Remember me
                        </label>
                    </div>
                </div>
                <div>
                    <NavLink className={s.linkTransparent} to={FORGOT_PATH}>
                        Forgot password
                    </NavLink>
                </div>
                <div>
                    <button className={s.btnBlue}>Login</button>
                </div>
            </form>
            <p className={s.textLight}>Don't have an account?</p>
            <div>
                <NavLink className={s.linkBlue} to={REGISTER_PATH}>
                    Sign Up
                </NavLink>
            </div>
            <ErrorSnackbar/>
        </div>
    );
});

export default Login;
