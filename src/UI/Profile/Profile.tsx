import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {IAppStore} from '../../BLL/store/store';
import {getPacksTC} from '../../BLL/packs/packs-reducer';
import s from './ProfilePage.module.css';
import {RangeSlider} from '../common/Range/RangeSlider';
import {
    changeProfileData,
    InitialProfileStateType
} from '../../BLL/profile/profile-reducer';
import emptyProfilePhoto from '../../image/nophoto.jpg'
import {EditProfileModal} from './EditProfileModal';
import {CardPacksType, SortingPacksType} from '../../DAL/packs-api';
import {Sorting} from '../common/Sorting/Sorting';
import {PaginationPacksContainer} from '../common/Pagination/PaginationPacksContainer';
import SearchPacksContainer from '../common/Search/SearchPacksContainer';
import {getCardsTC} from '../../BLL/cards/cards-reducer';
import {Title} from '../common/Title';
import {TableContainer} from '../common/Table/TableContainer';


export const Profile = () => {
    const dispatch = useDispatch()
    const isInitialized = useSelector<IAppStore, boolean>((state) => state.app.isInitialized);
    const pageCount = useSelector<IAppStore, number>((state) => state.packs.pageCount);
    const profile = useSelector<IAppStore, InitialProfileStateType>(
        (state) => state.profile
    );
    const maxCardsCount = useSelector<IAppStore, number>(state => state.packs.maxCardsCount)
    const minCardsCount = useSelector<IAppStore, number>(state => state.packs.minCardsCount)
    const sortingBy = useSelector<IAppStore, SortingPacksType | null>(state => state.packs.sortingBy)
    const page = useSelector<IAppStore, number>(state => state.packs.page)
    const packName = useSelector<IAppStore, string>(state => state.packs.packName)
    const cardsValuesFromRange = useSelector<IAppStore, Array<number>>((state) => state.packs.cardsValuesFromRange);
    const packsList = useSelector<IAppStore, CardPacksType[]>((state) => state.packs.cardPacks)
    const onChangeProfileDataClick = useCallback((newName: string, avatar: string | ArrayBuffer | null) => dispatch(changeProfileData(newName, avatar)), [])
    // const isLoading = useSelector<IAppStore, boolean>((state) => state.app.isLoading);
    const currentPack = useSelector<IAppStore, CardPacksType | null>((state) => state.cards.currentPack)

    useEffect(() => {
        if (isInitialized) {
            dispatch(getPacksTC())
            currentPack && dispatch(getCardsTC({cardsPack_id: currentPack._id}))
        }
    }, [page, pageCount, cardsValuesFromRange, packName, sortingBy, currentPack])


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

            <div>
                <div className={s.profile__info}>
                    <ProfileInfo
                        name={profile.name}
                        avatar={profile.avatar}
                        onChangeProfileDataClick={onChangeProfileDataClick}
                    />
                    <RangeSlider
                        minCardsCount={minCardsCount}
                        maxCardsCount={maxCardsCount}
                        dispatch={dispatch}
                    />
                    <Sorting/>
                </div>
            </div>


            <div className={s.profile__main}>
                <div className={s.Table__top}>
                    <Title value={'My packs list'}/>
                    <SearchPacksContainer/>
                </div>
                <TableContainer/>
                <PaginationPacksContainer/>
            </div>
        </div>
    );
};

type ProfileInfoType = {
    avatar: string
    name: string
    onChangeProfileDataClick: (newName: string, avatar: string | ArrayBuffer | null) => void
}

const ProfileInfo = React.memo((props: ProfileInfoType) => {

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
})
