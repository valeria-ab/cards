const initialState: InitialStateType = {};

export const profileReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state };

    default:
      return { state };
  }
};

export type InitialStateType = {};

export const setAppStatusAC = (status: any) =>
  ({ type: "APP/SET-STATUS", status } as const);

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;

type ActionsType = SetAppStatusActionType;
