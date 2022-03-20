import React, {useCallback, useEffect} from 'react';
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
import {CardPacksType, SortingPacksType} from '../../DAL/packs-api';
import {Sorting} from '../common/Sorting/Sorting';
import {PaginationPacksContainer} from '../common/Pagination/PaginationPacksContainer';
import SearchPacksContainer from '../common/Search/SearchPacksContainer';
import {changeLayoutAC, getCardsTC} from '../../BLL/cards/cards-reducer';
import {Title} from '../common/Title';
import {TableContainer} from '../common/Table/TableContainer';
import {ProfileInfo} from './ProfileInfo';
import {RangeSliderContainer} from '../common/Range/RangeSliderContainer';
import {RequestStatusType} from '../../BLL/app/app-reducer';


export const ProfilePage = React.memo(() => {
    // console.log("profile")
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
    const onChangeProfileDataClick = useCallback((newName: string, avatar: string | ArrayBuffer | null) => dispatch(changeProfileData(newName, avatar)), [])
    const isLoading = useSelector<IAppStore, RequestStatusType>((state) => state.app.status);
    // const currentPack = useSelector<IAppStore, CardPacksType | null>((state) => state.cards.currentPack)

    useEffect(() => {

        if (isInitialized) {

            dispatch(getPacksTC())
            // currentPack && dispatch(getCardsTC({cardsPack_id: currentPack._id}))
        }
    }, [page, pageCount, cardsValuesFromRange, packName, sortingBy])
    // }, [page, pageCount, cardsValuesFromRange, packName, sortingBy, currentPack, maxCardsCount, minCardsCount])

    // useEffect(() => {
    //
    //     currentPack && dispatch(getCardsTC({cardsPack_id: currentPack._id}))
    // },[currentPack])

    useEffect(() => {
        dispatch(changeLayoutAC('profile'))

    },[])

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
                    <div className={s.profileInfo__b2}>
                    <ProfileInfo
                        name={profile.name}
                        avatar={profile.avatar}
                        onChangeProfileDataClick={onChangeProfileDataClick}
                    />
                    <RangeSliderContainer/>
                    <Sorting/>
                    </div>
                </div>



            <div className={s.profile__main}>
                <div className={s.profile__b2}>
                    <div className={s.Table__top}>
                        <Title value={'My packs list'}/>
                        <SearchPacksContainer/>
                    </div>
                    <TableContainer/>
                    <PaginationPacksContainer/>
                </div>

            </div>
        </div>
    );
});

