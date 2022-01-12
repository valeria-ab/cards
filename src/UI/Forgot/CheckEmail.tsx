import React from 'react';
import styles from "./CheckEmail.module.scss";

import icon from "../../image/OK.png";


export const CheckEmail = React.memo(() => {


    return (

        <div className={styles.main}>
            <div className={styles.check}>
                <div className={styles.check__body}>
                    <h2 className={styles.check__title}>It-incubator</h2>
                    <div className={styles.check__image}>
                <img className={styles.check__img} src={icon} alt=""/>
                </div>
                    <div className={styles.check__subtitle}>Check Email</div>
                    <div className={styles.check__text}>We’ve sent an Email with instructions to
                        example@mail.com
                    </div>
                </div>
            </div>
        </div>

);
});

