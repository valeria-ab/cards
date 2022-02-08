import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {InitialProfileStateType} from '../../BLL/profile/profileInitialState';
import {IAppStore} from '../../BLL/store/store';
import {getPacksTC, InitialStateType, setWithMyIdAC} from '../../BLL/packs/packs-reducer';
import s from './ProfilePage.module.scss';
import {Table} from '../Table/Table';
import {Cards} from '../Cards/Cards';
import {ChooseOwner} from '../PacksList/ChooseOwner/ChooseOwner';
import RangeSlider from '../PacksList/Range/RangeSlider';
import Search from '../PacksList/Search/Search';
import {changeUserNameOrAvatar} from '../../BLL/profile/profileReducer';
import {EditableSpan} from '../../BLL/profile/EditableSpan/EditableSpan';

export const Profile = () => {
    const dispatch = useDispatch()

    const withMyId = useSelector<IAppStore, boolean>(state => state.packs.withMyId)
    const isLoggedIn = useSelector<IAppStore, boolean>(
        (state) => state.login.isLoggedIn
    );
    const profile = useSelector<IAppStore, InitialProfileStateType>(
        (state) => state.profile
    );
    const packs = useSelector<IAppStore, InitialStateType>(
        (state) => state.packs
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

    const onChangeNameClick = (newName:string) => dispatch(changeUserNameOrAvatar(newName))

    //
    // useEffect(() => {
    //     if (isLoggedIn) {
    //         dispatch(getPacksTC({
    //             user_id: currentUserID
    //
    //         }))
    //         setTableOff(true)
    //     }
    // }, [isLoggedIn]);


    // useEffect(() => {
    //     dispatch(getPacksTC(packs.withMyId ? {user_id: currentUserID} : {}))
    // }, [packs.withMyId])
    // [dispatch, packs.page, packs.pageCount, packs.withMyId]


    useEffect(() => {
        if (isLoggedIn)  dispatch(getPacksTC({user_id: currentUserID}))
    }, [])

    useMemo(() => {
        if (isLoggedIn) dispatch(setWithMyIdAC(false))
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>;
    }

    return (
        <div className={s.container}>
            <div className={s.profile__info}>
                <h3 className={s.profile__text}>Profile</h3>
                E-mail: <i>{profile.email}</i>
                <div className={s.profile__textName}> Name:
                    <EditableSpan title={profile.name} onChange={onChangeNameClick}/>

                    {/*<i>{profile.name}</i>*/}
                    {/*<button onClick={onChangeNameClick}>change name</button>*/}
                </div>
                <div>publicCardPacksCount: <i>{profile.publicCardPacksCount}</i></div>

                <RangeSlider/>
            </div>
            <div className={s.profile__main}>

                {tableOff

                    ? <Table onClickCardsHandler={onClickCardsHandler}/>
                    : <Cards id={packID}
                             tableOffHandler={tableOffHandler}
                             cardsModeOff={cardsModeOff}/>}
            </div>
        </div>
    );
};
