import s from './MainHeader.module.scss';
import PackListIcon from '../../image/PacksListImg.png'
import ProfileIcon from '../../image/ProfileImg.png'
import {NavLink} from 'react-router-dom';
import {PACKS_LIST_PATH, PROFILE_PATH} from '../Routes';
import React from 'react';
import {logOut} from '../../BLL/login/loginThunk';
import {useDispatch} from 'react-redux';

export default function MainHeader() {
    const dispatch = useDispatch()

    return (
        <div className={s.MainHeader}>
            <div className={s.wrapper}>
                <h1 className={s.title}>It-incubator</h1>
                <div className={s.btnWrap}>
                    <NavLink to={PACKS_LIST_PATH}>
                        <button className={s.btn}>
                            <img className={s.btnImg} src={PackListIcon} alt="PacksListIcon"></img>
                            <span className={s.btnText}>Packs List</span>
                        </button>
                    </NavLink>
                    <NavLink to={PROFILE_PATH}>
                        <button className={s.btn}>
                            <img className={s.btnImg} src={ProfileIcon} alt="ProfileIcon"></img>
                            <span className={s.btnText}>Profile</span>
                        </button>
                    </NavLink>
                    <button className={s.btn}
                    onClick={() => dispatch(logOut())}
                    >
                        <img className={s.btnImg} src={ProfileIcon} alt="ProfileIcon"></img>
                        <span className={s.btnText}>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};


