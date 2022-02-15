import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {IAppStore} from '../../BLL/store/store';
import {getPacksTC, InitialStateType, setWithMyIdAC} from '../../BLL/packs/packs-reducer';
import s from './ProfilePage.module.scss';
import {Table} from '../Table/Table';
import {Cards} from '../Cards/Cards';
import RangeSlider from '../PacksList/Range/RangeSlider';
import {EditableSpan} from './EditableSpan/EditableSpan';
import {checkAuthMe} from '../../BLL/login/loginThunk';
import {changeUserNameOrAvatar, InitialProfileStateType} from '../../BLL/profile/profile-reducer';
import {CardPacksType} from '../../DAL/packs-api';

export const Profile = () => {
    const dispatch = useDispatch()
    const isInitialized = useSelector<IAppStore, boolean>((state) => state.app.isInitialized);
    const isLoading = useSelector<IAppStore, boolean>((state) => state.app.isLoading);
    const profile = useSelector<IAppStore, InitialProfileStateType>(
        (state) => state.profile
    );

    const currentUserID = useSelector<IAppStore, string>((state) => state.profile._id);
    const withMyId = useSelector<IAppStore, boolean>(state => state.packs.withMyId)

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
    const cardPacks = useSelector<IAppStore, CardPacksType[]>((state) => state.packs.cardPacks);

    const onChangeNameClick = (newName:string) => dispatch(changeUserNameOrAvatar(newName))


    useEffect(() => {
        dispatch(getPacksTC())
    }, [])


    if (!isInitialized) {
        return <Navigate to={'/login'}/>;
    }

    // if(isLoading) return <div>loading</div>

    // if (!isInitialized) {
    //     return (
    //         <div
    //             style={{
    //                 position: "fixed",
    //                 top: "30%",
    //                 textAlign: "center",
    //                 width: "100%",
    //             }}
    //         >
    //             <CircularProgress />
    //         </div>
    //     );
    // }


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
