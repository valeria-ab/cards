import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {InitialProfileStateType} from "../../BLL/profile/profileInitialState";
import {IAppStore} from "../../BLL/store/store";
import {getPacksTC} from "../../BLL/packs/packs-reducer";
import {cardPacksType} from "../../DAL/Packs-api";
import styles from "./ProfilePage.module.scss";


export const ProfilePage = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<IAppStore, boolean>(
        (state) => state.login.isLoggedIn
    );
    const profile = useSelector<IAppStore, InitialProfileStateType>(
        (state) => state.profile
    );

    const currentUserID = useSelector<IAppStore, string>((state) => state.profile._id);
    const cardPacks = useSelector<IAppStore, cardPacksType[]>((state) => state.packs.cardPacks);

    useEffect(() => {
                dispatch(getPacksTC({
            user_id: currentUserID

        }))
    }, []);


    console.log(currentUserID);
    console.log(cardPacks);


    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>;
    }

    return (
        <div>
            <div className={"profile__info"}>
                <h3>Profile</h3>
                <div>created: "2022-01-11T12:05:19.647Z"</div>
                email:{profile.email}
                <div>isAdmin: {profile.isAdmin} </div>
                <div> name:{profile.name}</div>
                <div>publicCardPacksCount:{profile.publicCardPacksCount}</div>
                rememberMe: {profile.rememberMe}
                <div>token: {profile.token}</div>
                tokenDeathTime: {profile.tokenDeathTime}
                <div> updated:{profile.updated}</div>
                verified: {profile.verified}
                <div>__v: {profile.__v}</div>
                <div>_id: {profile._id}</div>
            </div>
            <div className={styles.profile__main}>
                <div className={styles.table}>
                    <div className={styles.header}>
                        <div className={styles.header__item}>Name</div>
                        <div className={styles.header__item}>Cards</div>
                        <div className={styles.header__item}>Last Updated</div>
                        <div className={styles.header__item}>Created by</div>
                        <div className={styles.header__item}>Actions</div>
                    </div>
                    <div className={styles.table__main}>
                        {cardPacks.map((pack)=> {
                            return (<div key={pack._id} className={styles.table__row}>
                                <div className={styles.table__name}>{pack.name}</div>
                                <div className={styles.table__cards}>{pack.cardsCount}</div>
                                <div className={styles.table__updated}>{pack.updated}</div>
                                <div className={styles.table__created}>{pack.created}</div>
                                <div className={styles.table__actions}><div className="buttons"> <button>Delete</button> <button>Edit</button></div> </div>
                            </div>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
