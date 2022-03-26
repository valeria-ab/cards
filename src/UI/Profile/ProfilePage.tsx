import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {IAppStore} from '../../BLL/store/store';
import {getPacksTC, setCardsPacksCountFromRangeAC} from '../../BLL/packs/packs-reducer';
import s from './ProfilePage.module.css';
import {
    InitialProfileStateType
} from '../../BLL/profile/profile-reducer';
import {SortingPacksType} from '../../DAL/packs-api';
import {Sorting} from '../common/Sorting/Sorting';
import {PaginationPacksContainer} from '../common/Pagination/PaginationPacksContainer';
import {changeLayoutAC} from '../../BLL/cards/cards-reducer';
import {Title} from '../common/Title';
import {TableContainer} from '../common/Table/TableContainer';
import {ProfileInfo} from './ProfileInfo';
import {RangeSliderContainer} from '../common/Range/RangeSliderContainer';
import {ErrorSnackbar} from '../common/Error/ErrorSnackbar';


export const ProfilePage = React.memo(() => {
    const dispatch = useDispatch()
    const isInitialized = useSelector<IAppStore, boolean>((state) => state.app.isInitialized);
    const pageCount = useSelector<IAppStore, number>((state) => state.packs.pageCount);
    const profile = useSelector<IAppStore, InitialProfileStateType>(
        (state) => state.profile
    );
    const sortingBy = useSelector<IAppStore, SortingPacksType | "">(state => state.packs.sortingBy)
    const page = useSelector<IAppStore, number>(state => state.packs.page)
    const packName = useSelector<IAppStore, string>(state => state.packs.packName)
    const cardsValuesFromRange = useSelector<IAppStore, Array<number>>((state) => state.packs.cardsValuesFromRange);

    useEffect(() => {
        if (isInitialized) {
          dispatch(getPacksTC())
        }
    }, [page, pageCount, packName, sortingBy,
        cardsValuesFromRange,
    ])


    useEffect(() => {
        dispatch(changeLayoutAC('profile'))
        // return () => {
        //     dispatch(setCardsPacksCountFromRangeAC([0,1000]))
        // }
    },[])

    // const refresh = async () => {
    //     await dispatch(getPacksTC())
    // }


    if (!isInitialized) {
        return <Navigate to={'/login'}/>;
    }


    return (
        <div className={s.container}>

                <div className={s.profile__info}>
                    {/*<div className={s.profileInfo__b2}>*/}
                    <ProfileInfo
                        name={profile.name}
                        avatar={profile.avatar}
                        // onChangeProfileDataClick={onChangeProfileDataClick}
                    />
                    <RangeSliderContainer/>
                    <Sorting/>
                    {/*</div>*/}
                </div>



            <div className={s.profile__main}>
                {/*<div className={s.profile__b2}>*/}
                    {/*<div className={s.Table__top}>*/}

                        <Title value={'My packs list'}/>

                    {/*</div>*/}
                    <TableContainer/>
                    <PaginationPacksContainer/>
                {/*</div>*/}

            </div>
            <ErrorSnackbar/>
        </div>
    );
});

