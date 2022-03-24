import React, {ChangeEvent, useState} from "react";
import styles from "./NewPassword.module.scss";
import style from '../InitCommonStyles.module.css';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {IAppStore} from "../../../BLL/store/store";
import eye from "../../../image/eye.svg";
import eyeSlash from "../../../image/eye-slash.svg";
import Login from "../Login/Login";
import {sendNewPasswordTC} from '../../../BLL/forgot/forgot-reducer';

export const NewPassword = React.memo(() => {
    const [valueInput, setValueInput] = useState<string>("");
    const [icon, setIcon] = useState<boolean>(true);
    const dispatch = useDispatch();
    const {token} = useParams<"token">();
    const isSend = useSelector<IAppStore, boolean>(
        (state) => state.forgotPassword.isSend
    );

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.currentTarget.value);
    };
    const onIconHandler = () => {
        setIcon(!icon);
    };

    const onSendPasswordChange = () => {
        if (token) dispatch(sendNewPasswordTC(valueInput, token));
    };

    if (isSend) return <Login/>;

    return (
        <div className={styles.main}>
            <div className={styles.password}>
                <div className={styles.password__body}>
                    <h2 className={style.title}>Playing cards</h2>
                    <div className={styles.password__subtitle}>Create new password</div>
                    <div className={styles.password__inp__wrap}>
                        <input
                            placeholder={"Password"}
                            type={icon ? "password" : "text"}
                            value={valueInput}
                            onChange={onInputChange}
                            className={styles.password__input}
                        />
                        <img
                            className={styles.password__icon}
                            src={icon ? eye : eyeSlash}
                            alt=""
                            onClick={onIconHandler}
                        />
                    </div>
                    <div className={styles.password__text}>
                        Create new password and we will send you further instructions to
                        email
                    </div>
                    <button
                        className={style.btnBlue}
                        style={{marginTop: "0"}}
                        onClick={onSendPasswordChange}
                    >
                        Create new password
                    </button>
                </div>
            </div>
        </div>
    );
});
