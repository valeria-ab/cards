import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {IAppStore} from '../../BLL/store/store';
import {getPacksTC} from '../../BLL/packs/packs-reducer';
import s from './ProfilePage.module.scss';
import {Table} from '../Table/Table';
import {Cards} from '../Cards/Cards';
import RangeSlider from '../PacksList/Range/RangeSlider';
import {EditableSpan} from './EditableSpan/EditableSpan';
import {changeUserNameOrAvatar, InitialProfileStateType} from '../../BLL/profile/profile-reducer';

export const Profile = () => {
    const dispatch = useDispatch()
    const isInitialized = useSelector<IAppStore, boolean>((state) => state.app.isInitialized);
    const pageCount = useSelector<IAppStore, number>((state) => state.packs.pageCount);
    const profile = useSelector<IAppStore, InitialProfileStateType>(
        (state) => state.profile
    );
    const page = useSelector<IAppStore, number>(state => state.packs.page)
    const packName = useSelector<IAppStore, string>(state => state.packs.packName)
    const cardsValuesFromRange = useSelector<IAppStore, Array<number>>((state) => state.packs.cardsValuesFromRange);

    const onChangeNameClick = (newName: string) => dispatch(changeUserNameOrAvatar(newName))


    useEffect(() => {
        dispatch(getPacksTC())
    }, [page, pageCount, cardsValuesFromRange, packName])


    const refresh = async () => {
        await dispatch(getPacksTC())
    }


    if (!isInitialized) {
        return <Navigate to={'/login'}/>;
    }
    return (
        <div className={s.container}>
            <div className={s.profile__info}>
                <h3 className={s.profile__text}>Profile</h3>
                E-mail: <i>{profile.email}</i>
                <div className={s.profile__textName}> Name:
                    <EditableSpan title={profile.name} onChange={onChangeNameClick}/>
                </div>
                <div>publicCardPacksCount: <i>{profile.publicCardPacksCount}</i></div>

                <RangeSlider/>
            </div>
            <div className={s.profile__main}>
                {/*{props.isTableMode && <Table/>}*/}
                <Table/>
            </div>
        </div>
    );
};
