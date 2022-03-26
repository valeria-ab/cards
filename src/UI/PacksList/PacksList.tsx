import React, {useEffect} from 'react';
import {ChooseOwner} from './ChooseOwner/ChooseOwner';
import s from '../Profile/ProfilePage.module.css';
import {getPacksTC, setCardsPacksCountFromRangeAC} from '../../BLL/packs/packs-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../BLL/store/store';
import {Navigate} from 'react-router-dom';
import {SortingPacksType} from '../../DAL/packs-api';
import {Sorting} from '../common/Sorting/Sorting';
import {PaginationPacksContainer} from '../common/Pagination/PaginationPacksContainer';
import {changeLayoutAC} from '../../BLL/cards/cards-reducer';
import {Title} from '../common/Title';
import {TableContainer} from '../common/Table/TableContainer';
import {RangeSliderContainer} from '../common/Range/RangeSliderContainer';
import {ErrorSnackbar} from '../common/Error/ErrorSnackbar';


export const PacksList = () => {

    const dispatch = useDispatch()
    const isInitialized = useSelector<IAppStore, boolean>((state) => state.app.isInitialized);
    const withMyId = useSelector<IAppStore, boolean>(state => state.packs.withMyId)
    const page = useSelector<IAppStore, number>(state => state.packs.page)
    const sortingBy = useSelector<IAppStore, SortingPacksType | ''>(state => state.packs.sortingBy)
    const packName = useSelector<IAppStore, string>(state => state.packs.packName)
    const pageCount = useSelector<IAppStore, number>(state => state.packs.pageCount)
    const cardsValuesFromRange = useSelector<IAppStore, Array<number>>((state) => state.packs.cardsValuesFromRange);


    useEffect(() => {
        if (isInitialized) {
            dispatch(getPacksTC())
        }
    }, [
        withMyId,
        page,
        pageCount,
        cardsValuesFromRange,
        packName,
        sortingBy,
        dispatch,
        isInitialized
    ])

    useEffect(() => {
        dispatch(changeLayoutAC('packs-list'))
        // return () => {
        //     dispatch(setCardsPacksCountFromRangeAC([0,1000]))
        // }
    }, [dispatch])

    if (!isInitialized) {
        return <Navigate to={'/login'}/>;
    }

    return (
        // <div className={s.PacksList}>
        <div className={s.container}>
            <div className={s.profile__info}>
                <div className={s.profile__ChooseOwner}>
                    <ChooseOwner/>
                </div>
                <RangeSliderContainer/>
                <Sorting/>
            </div>

            <div className={s.profile__main}>
                {/*<div className={s.profile__b2}>*/}
                    <Title value={'Packs list'}/>
                    <TableContainer/>
                    <PaginationPacksContainer/>
                {/*</div>*/}
            </div>
            <ErrorSnackbar/>
        </div>

    // </div>
)

}
