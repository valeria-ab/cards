import s from './MainHeader.module.css';
import PackListIcon from '../../image/PacksListImg.png'
import ProfileIcon from '../../image/ProfileImg.png'
import LogoutIcon from '../../image/logout.png'
import {NavLink} from 'react-router-dom';
import {PACKS_LIST_PATH, PROFILE_PATH} from '../Routes';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCardsPacksCountFromRangeAC, setWithMyIdAC} from '../../BLL/packs/packs-reducer';
import {logOut} from '../../BLL/login/login-reducer';
import {IAppStore} from '../../BLL/store/store';
import {LinearProgress} from '@mui/material';
import {RequestStatusType} from '../../BLL/app/app-reducer';

export const MainHeader = React.memo(() => {
    const dispatch = useDispatch()

    const isInitialized = useSelector<IAppStore, boolean>(state => state.app.isInitialized)
    const layout = useSelector<IAppStore, 'profile' | 'packs-list'>(state => state.cards.layout)
    const [buttonActive, setButtonActive] = useState<'profile' | 'packs-list' | 'logout'>(layout)
    const status = useSelector<IAppStore, RequestStatusType>(
        (state) => state.app.status
    );

    useEffect(() => {
        setButtonActive(layout)
    }, [layout])

    return (
        <div className={s.mainHeader}>
            {status === 'loading' && <div className={s.linearProgress}>
                <LinearProgress color={'info'}/>
            </div>
            }
            <div className={s.wrapper}>


                <div className={s.title}>
                    <h1>PLAYING CARDS</h1>
                </div>


                <div className={s.btnWrap}>
                    {isInitialized && <>
                        <NavLink to={PACKS_LIST_PATH}>
                            <button className={
                                buttonActive === 'packs-list'
                                    ? `${s.btn} ${s.active}`
                                    : s.btn
                            }
                                    onClick={() => {
                                        dispatch(setWithMyIdAC(false))
                                        dispatch(setCardsPacksCountFromRangeAC([0, 1000]))
                                        // dispatch(changeLayoutAC('packs-list'))
                                        // dispatch(setSortPacksValueAC(null))
                                        // setButtonActive('packs-list')
                                    }}>
                                <img className={s.btnImg} src={PackListIcon} alt="PacksListIcon"/>
                                <span>Packs List</span>
                            </button>
                        </NavLink>
                        <NavLink to={PROFILE_PATH}>
                            <button className={
                                buttonActive === 'profile'
                                    ? `${s.btn} ${s.active}`
                                    : s.btn
                            }
                                    onClick={() => {
                                        dispatch(setWithMyIdAC(true))
                                        dispatch(setCardsPacksCountFromRangeAC([0, 1000]))
                                        // dispatch(changeLayoutAC('profile'))
                                        // dispatch(setSortPacksValueAC(null))
                                        // setButtonActive('profile')
                                    }}>
                                <img className={s.btnImg} src={ProfileIcon} alt="ProfileIcon"/>
                                <span>Profile</span>
                            </button>
                        </NavLink>
                        <button className={
                            buttonActive === 'logout'
                                ? `${s.btn} ${s.active}`
                                : s.btn
                        }
                                onClick={() => {
                                    dispatch(logOut())
                                }}
                        >
                            <img className={`${s.btnImg} ${s.btnLogout}`} src={LogoutIcon} alt="ProfileIcon"/>
                            <span>Logout</span>
                        </button>
                    </>
                    }
                </div>


            </div>
        </div>
    );
})


export default MainHeader;