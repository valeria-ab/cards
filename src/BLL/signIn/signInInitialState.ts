export type SignInState = {
  isLoggedIn: boolean;
  error: string;
};

export const signInInitialState: SignInState = {
  isLoggedIn: false,
  error: "",
};
