export const SIGN_IN_LOADING = "SIGN_IN/LOADING";
export const SIGN_IN_ERROR = "SIGN_IN/ERROR";
export const SIGN_IN_SUCCESS = "SIGN_IN/SUCCESS";

export const SIGN_IN = "SIGN_IN/SOME";

interface ISignInSome {
  type: typeof SIGN_IN;
}

type SignInSuccessType = {
  type: typeof SIGN_IN_SUCCESS;
}

export type SignInActions = SignInSuccessType;

export const signInSome = (): ISignInSome => ({
  type: SIGN_IN,
});

export const SignInSuccess = (): SignInSuccessType => ({
  type: SIGN_IN_SUCCESS,
});
