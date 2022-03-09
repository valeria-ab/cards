import s from './ProfilePage.module.css';
import emptyProfilePhoto from '../../image/nophoto.jpg'
import {EditProfileModal} from './EditProfileModal';
import React, {useState} from 'react';


type ProfileInfoPropsType = {
    avatar: string
    name: string
    onChangeProfileDataClick: (newName: string, avatar: string | ArrayBuffer | null) => void
}

export const ProfileInfo = React.memo((props: ProfileInfoPropsType) => {

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
