import s from './ProfilePage.module.css';
import emptyProfilePhoto from '../../image/nophoto.jpg'
import pencil
    from '../../image/kisspng-verb-grammar-nonpast-tense-noun-pencil-icon-5aed74129c3655.1596332715255111866399.png'
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
            {/*<h3 className={s.profile__text}>Profile</h3>*/}
            <div
                style={{
                    paddingTop: '20px',
                    paddingBottom: '5px'

                }}
            >
                <img src={props.avatar ? props.avatar : emptyProfilePhoto} style={{
                    borderRadius: '50%',
                    height: '150px',
                    margin: ' 0 auto'
                }}/>
            </div>

            <div className={s.profile__textName}>
                <span>{props.name}</span>
            </div>
            <div style={{opacity: 0.8, fontSize: '14px', cursor: "pointer"}}
                 onClick={() => {
                     setEditProfileMode(true)
                 }}>edit profile <img src={pencil} height={'13px'}
                                      style={{display: 'inline-block', marginLeft: '10px'}}/>
            </div>
        </div>
    )
})
