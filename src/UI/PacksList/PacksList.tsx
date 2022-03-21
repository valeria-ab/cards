import React, {useEffect} from 'react';
import {ChooseOwner} from './ChooseOwner/ChooseOwner';
import s from '../Profile/ProfilePage.module.css';
import {getPacksTC, setWithMyIdAC} from '../../BLL/packs/packs-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../BLL/store/store';
import {Navigate} from 'react-router-dom';
import {CardPacksType, SortingPacksType} from '../../DAL/packs-api';
import {Sorting} from '../common/Sorting/Sorting';
import {PaginationPacksContainer} from '../common/Pagination/PaginationPacksContainer';
import SearchPacksContainer from '../common/Search/SearchPacksContainer';
import {RangeSlider} from '../common/Range/RangeSlider';
import {changeLayoutAC, getCardsTC} from '../../BLL/cards/cards-reducer';
import {Title} from '../common/Title';
import {TableContainer} from '../common/Table/TableContainer';
import {RangeSliderContainer} from '../common/Range/RangeSliderContainer';
import {RequestStatusType} from '../../BLL/app/app-reducer';


export const
    PacksList = () => {

    const dispatch = useDispatch()
    const isInitialized = useSelector<IAppStore, boolean>((state) => state.app.isInitialized);
    const withMyId = useSelector<IAppStore, boolean>(state => state.packs.withMyId)
    const page = useSelector<IAppStore, number>(state => state.packs.page)
    const sortingBy = useSelector<IAppStore, SortingPacksType | "">(state => state.packs.sortingBy)
    const packName = useSelector<IAppStore, string>(state => state.packs.packName)
    const pageCount = useSelector<IAppStore, number>(state => state.packs.pageCount)
    const cardsValuesFromRange = useSelector<IAppStore, Array<number>>((state) => state.packs.cardsValuesFromRange);
    const status = useSelector<IAppStore, RequestStatusType>((state) => state.app.status);
    // const currentPack = useSelector<IAppStore, CardPacksType | null>((state) => state.cards.currentPack)
    const maxCardsCount = useSelector<IAppStore, number>(state => state.packs.maxCardsCount)
    const minCardsCount = useSelector<IAppStore, number>(state => state.packs.minCardsCount)

    // const refresh = async () => {
    //     await dispatch(getPacksTC())
    // }


    useEffect(() => {
        if (isInitialized) {
        dispatch(getPacksTC())
            // currentPack && dispatch(getCardsTC({cardsPack_id: currentPack._id}))
        }
    }, [
        withMyId,
        page,
        pageCount,
        cardsValuesFromRange,
        packName,
        sortingBy,
        // currentPack,
        // maxCardsCount,
        // minCardsCount
    ])

        useEffect(() => {
            dispatch(changeLayoutAC('packs-list'))
        },[])

    if (!isInitialized) {
        return <Navigate to={'/login'}/>;
    }

    // if (status) {
    //     return <div className={s.PacksList}>loading...</div>
    // }

    return <div className={s.PacksList}>
        <div className={s.container}>
            <div className={s.profile__info}>
                <div className={s.profile__ChooseOwner}>
                    <ChooseOwner/>
                </div>
                <RangeSliderContainer/>
                <Sorting/>
            </div>
            <div className={s.profile__main}>
                <Title value={'Packs List'}/>
                {/*<SearchPacksContainer/>*/}
                <TableContainer/>
                <PaginationPacksContainer/>
            </div>
        </div>
    </div>

}
