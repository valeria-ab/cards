import s from './MainHeader.module.scss';
import PackListIcon from '../../image/PacksListImg.png'
import ProfileIcon from '../../image/ProfileImg.png'
import LogoutIcon from '../../image/logout.png'
import {NavLink} from 'react-router-dom';
import {PACKS_LIST_PATH, PROFILE_PATH} from '../Routes';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCardsPacksCountFromRangeAC, setSortPacksValueAC, setWithMyIdAC} from '../../BLL/packs/packs-reducer';
import {logOut} from '../../BLL/login/login-reducer';
import {changeLayoutAC} from '../../BLL/cards/cards-reducer';
import {IAppStore} from '../../BLL/store/store';

export const MainHeader = React.memo(() => {
    const dispatch = useDispatch()
    const isInitialized = useSelector<IAppStore, boolean>(state => state.app.isInitialized)

    return (
        <div className={s.MainHeader}>
            <div className={s.wrapper}>
                <h1 className={s.title}>PLAYING CARDS</h1>


                {isInitialized && <div className={s.btnWrap}>
                    <NavLink to={PACKS_LIST_PATH}>
                        <button className={s.btn} onClick={() => {
                            dispatch(setWithMyIdAC(false))
                            // dispatch(setCardsPacksCountFromRangeAC([0, 1000]))
                            dispatch(changeLayoutAC('packs-list'))
                            // dispatch(setSortPacksValueAC(null))
                        }}>
                            <img className={s.btnImg} src={PackListIcon} alt="PacksListIcon"/>
                            <span>Packs List</span>
                        </button>
                    </NavLink>
                    <NavLink to={PROFILE_PATH}>
                        <button className={s.btn} onClick={() => {
                            dispatch(setWithMyIdAC(true))
                            // dispatch(setCardsPacksCountFromRangeAC([0, 1000]))
                            dispatch(changeLayoutAC('profile'))
                            // dispatch(setSortPacksValueAC(null))
                        }}>
                            <img className={s.btnImg} src={ProfileIcon} alt="ProfileIcon"/>
                            <span>Profile</span>
                        </button>
                    </NavLink>
                    <button className={s.btn}
                            onClick={() => {
                                dispatch(logOut())
                            }}
                    >
                        <img className={`${s.btnImg} ${s.btnLogout}`} src={LogoutIcon} alt="ProfileIcon"/>
                        <span>Logout</span>
                    </button>
                </div>}


            </div>
        </div>
    );
})


export default MainHeader;