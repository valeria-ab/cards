import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {IAppStore} from '../../BLL/store/store';
import {getPacksTC} from '../../BLL/packs/packs-reducer';
import s from './ProfilePage.module.css';
import {Table} from '../Table/Table';
import RangeSlider from '../PacksList/Range/RangeSlider';

import {
    changeProfileData,
    InitialProfileStateType
} from '../../BLL/profile/profile-reducer';
import emptyProfilePhoto from '../../image/nophoto.jpg'
import {EditProfileModal} from './EditProfileModal';
import {SortingPacksType} from '../../DAL/packs-api';
import {Sorting} from '../PacksList/Sorting/Sorting';
import {PaginationPacksContainer} from '../PacksList/Pagination/PaginationPacksContainer';


export const Profile = () => {
    const dispatch = useDispatch()
    const isInitialized = useSelector<IAppStore, boolean>((state) => state.app.isInitialized);
    const pageCount = useSelector<IAppStore, number>((state) => state.packs.pageCount);
    const profile = useSelector<IAppStore, InitialProfileStateType>(
        (state) => state.profile
    );

    const sortingBy = useSelector<IAppStore, SortingPacksType | null>(state => state.packs.sortingBy)
    const page = useSelector<IAppStore, number>(state => state.packs.page)
    const packName = useSelector<IAppStore, string>(state => state.packs.packName)
    const cardsValuesFromRange = useSelector<IAppStore, Array<number>>((state) => state.packs.cardsValuesFromRange);

    const onChangeProfileDataClick = (newName: string, avatar: string | ArrayBuffer | null) => dispatch(changeProfileData(newName, avatar))

    // const isLoading = useSelector<IAppStore, boolean>((state) => state.app.isLoading);


    useEffect(() => {
        if (isInitialized) dispatch(getPacksTC())
    }, [page, pageCount, cardsValuesFromRange, packName, sortingBy])


    // const refresh = async () => {
    //     await dispatch(getPacksTC())
    // }


    if (!isInitialized) {
        return <Navigate to={'/login'}/>;
    }

    // if (isLoading) {
    //     return <div className={s.container}>loading...</div>
    // }

    return (
        <div className={s.container}>
            <div className={s.profile__info}>
                <ProfileInfo
                    name={profile.name}
                    avatar={profile.avatar}
                    onChangeProfileDataClick={onChangeProfileDataClick}
                />
                <RangeSlider/>
                <Sorting/>
            </div>
            <div className={s.profile__main}>
                <Table/>

            </div>
        </div>
    );
};

type ProfileInfoType = {
    avatar: string
    name: string
    onChangeProfileDataClick: (newName: string, avatar: string | ArrayBuffer | null) => void
}

const ProfileInfo = (props: ProfileInfoType) => {

    const [editProfileMode, setEditProfileMode] = useState(false);
    return (
        <div className={s.qqqqqqq}>
            {editProfileMode && <EditProfileModal setEditProfileMode={setEditProfileMode}
                                                  title={props.name}
                                                  onChangeProfileDataClick={props.onChangeProfileDataClick}
            />}
            <h3 className={s.profile__text}>Profile</h3>
            <img src={props.avatar ? props.avatar : emptyProfilePhoto} style={{
                borderRadius: '50%'
            }}/>
            <div className={s.profile__textName}>
                <span>{props.name}</span>
            </div>
            <button onClick={() => {
                setEditProfileMode(true)
            }}>edit profile
            </button>
        </div>
    )
}