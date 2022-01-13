export const initialProfileState = {
  _id: "",
  email: "",
  name: "",
  avatar: "",
  publicCardPacksCount: 0,
  created: "",
  updated: "",
  isAdmin: false,
  verified: false,
  rememberMe: false,
  error: "",
  token: "",
  tokenDeathTime: 0,
  __v: 0,
};

//types
export type InitialProfileStateType = typeof initialProfileState;
