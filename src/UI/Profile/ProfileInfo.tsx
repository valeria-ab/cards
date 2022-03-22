import s from './ProfilePage.module.css';
import emptyProfilePhoto from '../../image/nophoto.jpg'
import pencil
    from '../../image/kisspng-verb-grammar-nonpast-tense-noun-pencil-icon-5aed74129c3655.1596332715255111866399.png'
import {EditProfileModal} from './EditProfileModal';
import React, {useRef, useState} from 'react';
import {TextField} from '@mui/material';


type ProfileInfoPropsType = {
    avatar: string
    name: string
    onChangeProfileDataClick: (newName: string, avatar: string | ArrayBuffer | null) => void
}

export const ProfileInfo = React.memo((props: ProfileInfoPropsType) => {
    const [title, setTitle] = useState(props.name)
    const inputRef = useRef<HTMLInputElement>(null)
    const onAvatarClick = () => inputRef.current?.click()
    const [editProfileMode, setEditProfileMode] = useState(false);
    return (
        <div className={s.qqqqqqq}>
            {/*{editProfileMode && <EditProfileModal setEditProfileMode={setEditProfileMode}*/}
            {/*                                      title={props.name}*/}
            {/*                                      onChangeProfileDataClick={props.onChangeProfileDataClick}*/}
            {/*/>}*/}
            {/*<h3 className={s.profile__text}>Profile</h3>*/}
            <div
                style={{
                    paddingTop: '20px',
                    marginBottom: "15px",
                    // paddingBottom: '5px',

                }}
                onClick={() => alert('choose photo')}
            >
                {/*<div   className={s.profile__photo_wrapper}>*/}
                <div   className={s.editAvatar}>
                    <img src={props.avatar ? props.avatar : emptyProfilePhoto} className={s.profile__photo}/>
                </div>

            </div>

            <div className={s.profile__textName}
                 onClick={() => {
                     setEditProfileMode(true)
                 }
                 }
            >

                {editProfileMode
                    ? <TextField variant={"standard"}
                                value={props.name}
                                onBlur={() => {
                                    setEditProfileMode(false)
                                }}
                                autoFocus
                                onChange={(e) => setTitle(e.currentTarget.value)}
                    />
                    : <span onClick={() => {
                        setEditProfileMode(false)
                    }
                    }>{props.name}
                        <img src={pencil} height={'13px'}
                                       style={{display: 'inline-block', marginLeft: '10px'}}/>
                </span>
                }


            </div>




            {/*<div style={{opacity: 0.8, fontSize: '14px', cursor: 'pointer'}}*/}
            {/*     onClick={() => {*/}
            {/*         setEditProfileMode(true)*/}
            {/*     }}>edit profile <img src={pencil} height={'13px'}*/}
            {/*                          style={{display: 'inline-block', marginLeft: '10px'}}/>*/}
            {/*</div>*/}
        </div>
    )
})
