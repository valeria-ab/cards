export type LoginState = {
  isLoggedIn: boolean
  error: string
  // logoutSuccess: string | null
};

export const loginInitialState: LoginState = {
  // logoutSuccess: null,
  isLoggedIn: false,
  error: "",
};
