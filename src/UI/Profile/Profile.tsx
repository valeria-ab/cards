import React, {useEffect, useState} from 'react';
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
import {CardPacksType} from '../../DAL/packs-api';

export const Profile = () => {
    const dispatch = useDispatch()
    const isInitialized = useSelector<IAppStore, boolean>((state) => state.app.isInitialized);
  const profile = useSelector<IAppStore, InitialProfileStateType>(
        (state) => state.profile
    );

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


    useEffect(() => {
        dispatch(getPacksTC())
    }, [])


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
