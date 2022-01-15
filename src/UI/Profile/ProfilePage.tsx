import {useSelector} from "react-redux";
import {InitialProfileStateType} from "../../BLL/profile/profileInitialState";
import {IAppStore} from "../../BLL/store/store";

export const ProfilePage = () => {
    const isLoggedIn = useSelector<IAppStore, boolean>(
        (state) => state.login.isLoggedIn
    );
    const profile = useSelector<IAppStore, InitialProfileStateType>(
        (state) => state.profile
    );

    const currentUserID = useSelector<IAppStore, string>((state) => state.profile._id);

console.log(currentUserID);


    // if (!isLoggedIn) {
    //   return <Navigate to={"/login"} />;
    // }

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
            <div className={"profile__main"}>

                ffffff
            </div>
        </div>
    );
};
