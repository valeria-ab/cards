import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {IAppStore} from '../../BLL/store/store';
import {getPacksTC} from '../../BLL/packs/packs-reducer';
import s from './ProfilePage.module.scss';
import {Table} from '../Table/Table';
import {Cards} from '../Cards/Cards';
import RangeSlider from '../PacksList/Range/RangeSlider';
import {EditableSpan} from './EditableSpan/EditableSpan';
import {changeProfilePhoto, changeUserName, InitialProfileStateType} from '../../BLL/profile/profile-reducer';
import emptyProfilePhoto from '../../image/nophoto.jpg'

export const Profile = () => {
    const dispatch = useDispatch()
    const isInitialized = useSelector<IAppStore, boolean>((state) => state.app.isInitialized);
    const pageCount = useSelector<IAppStore, number>((state) => state.packs.pageCount);
    const profile = useSelector<IAppStore, InitialProfileStateType>(
        (state) => state.profile
    );





    const page = useSelector<IAppStore, number>(state => state.packs.page)
    const error = useSelector<IAppStore, string | null>(state => state.app.error)
    const packName = useSelector<IAppStore, string>(state => state.packs.packName)
    const cardsValuesFromRange = useSelector<IAppStore, Array<number>>((state) => state.packs.cardsValuesFromRange);

    const onChangeNameClick = (newName: string) => dispatch(changeUserName(newName))
    const onDeleteClick = (avatar: string) => dispatch(changeProfilePhoto(avatar))

    const inRef = useRef<HTMLInputElement>(null)


    useEffect(() => {
        dispatch(getPacksTC())
    }, [page, pageCount, cardsValuesFromRange, packName])


    // const refresh = async () => {
    //     await dispatch(getPacksTC())
    // }

    const [file, setFile] = useState<File>()

    const [file64, setFile64] = useState<string | ArrayBuffer | null>();
    const [fileData, setFileData] = useState();

    const upload = (e: ChangeEvent<HTMLInputElement>) => {

        const reader = new FileReader()

        //у таргета files всегда массив, даже если инпуту не поставлен multiply там всего 1 файл
        const newFile = e.target.files && e.target.files[0]




        if (newFile) {
            reader.onloadend = () => setFile64(reader.result);
            reader.readAsDataURL(newFile)

            // if (file64)  dispatch(changeProfilePhoto(file64))
        }


    }

    if (!isInitialized) {
        return <Navigate to={'/login'}/>;
    }
    // if(error) {
    //     return <Navigate to={'/login'}/>;
    // }
    return (
        <div className={s.container}>
            <div className={s.profile__info}>
                <h3 className={s.profile__text}>Profile</h3>
                <img src={profile.avatar ? profile.avatar : emptyProfilePhoto} style={{
                    borderRadius: '50%'
                }}/>

                <input type={'file'} accept={'.jpg, .jpeg, .png'} ref={inRef} style={{display: 'none'}}
                       onChange={upload}/>
                <button onClick={() => inRef && inRef.current && inRef.current.click()}>change photo</button>
                <button onClick={() => file64 && dispatch(changeProfilePhoto(file64))}>send</button>
                {/* если рефка была создана и была куда-то повешена то вызови событие клик. */}
                {/* таким образом мы можем кликнуть на всё что угодно на что была повешена рефка */}

                {/*E-mail: <i>{profile.email}</i>*/}
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
