export type LoginState = {
  isLoggedIn: boolean;
  error: string;
};

export const loginInitialState: LoginState = {
  isLoggedIn: false,
  error: "",
};
