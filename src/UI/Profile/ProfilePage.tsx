import { useSelector } from "react-redux";
import { InitialProfileStateType } from "../../BLL/profile/profileReducer";
import { IAppStore } from "../../BLL/store/store";

export const ProfilePage = () => {
  const profile = useSelector<IAppStore, InitialProfileStateType>(
    (state) => state.profile
  );
  return (
    <div>
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
  );
};
