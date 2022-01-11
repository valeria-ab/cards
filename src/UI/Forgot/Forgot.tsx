import React, {ChangeEvent, useState} from 'react';
import {Link} from 'react-router-dom';
import styles from "./Forgot.module.css";

export const Forgot = React.memo(() => {

    const [valueInput, setValueInput] = useState<string>("");

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.currentTarget.value)
    }


    return (
        <div className={styles.main}>
            <div className={styles.forgot}>
                <div className={styles.forgot__body}>
                    <h2 className={styles.forgot__title}>It-incubator</h2>
                    <div className={styles.forgot__subtitle}>Forgot your password?</div>
                    <input placeholder="Email" type="text" value={valueInput}
                           onChange={onInputChange}
                           className={styles.forgot__input}/>
                    <div className={styles.forgot__info}>Enter your email address and we
                        will
                        send you
                        further instructions
                    </div>
                    <button className={styles.forgot__button}>Send Instructions</button>
                    <Link to={"login"} className={styles.forgot__login}>Try logging
                        in</Link>
                </div>
            </div>
        </div>
    );
});

