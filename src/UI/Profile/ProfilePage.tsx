import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {InitialProfileStateType} from '../../BLL/profile/profileInitialState';
import {IAppStore} from '../../BLL/store/store';
import {getPacksTC} from '../../BLL/packs/packs-reducer';
import styles from './ProfilePage.module.css';
import {Table} from '../Table/Table';
import {Cards} from '../Cards/Cards';

export const ProfilePage = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<IAppStore, boolean>(
        (state) => state.login.isLoggedIn
    );
    const profile = useSelector<IAppStore, InitialProfileStateType>(
        (state) => state.profile
    );
    const currentUserID = useSelector<IAppStore, string>((state) => state.profile._id);


    const [tableOff, setTableOff] = useState<boolean>(true);
    const [packID, setPackID] = useState<string>('');


    const onClickCardsHandler = (id: string) => {
        setTableOff(false)
        setPackID(id)
    }

    const cardsModeOff = () => {
        setTableOff(true)
    }
    const tableOffHandler = () => {
        setTableOff(false)

    }


    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getPacksTC({
                user_id: currentUserID

            }))
            setTableOff(true)
        }
    }, [isLoggedIn]);


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>;
    }

    return (
        <div>
            <div className={'profile__info'}>
                <h3>Profile</h3>
                email: <i>{profile.email}</i>
                <div> name: <i>{profile.name}</i></div>
                <div>publicCardPacksCount: <i>{profile.publicCardPacksCount}</i></div>

                {/*<div>created: {profile.created}</div>*/}
                {/*<div>token: {profile.token}</div>*/}
                {/*<div>_id: {profile._id}</div>*/}
            </div>

            <div className={styles.profile__main}>
                {tableOff
                    ? <Table onClickCardsHandler={onClickCardsHandler}/>
                    : <Cards id={packID}
                             tableOffHandler={tableOffHandler}
                             cardsModeOff={cardsModeOff}/>}
            </div>
        </div>
    );
};
