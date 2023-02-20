enum ActionType {
  PLAYLISTS,
}

const initialState: IRequestContentInitialState = {
  playlists: { isLoading: false, error: null, payload: [] },
};

interface IRequestContentInitialState {
  playlists: { isLoading: boolean; error: string | null; payload: any[] };
}

const reducer = (
  state: IRequestContentInitialState = initialState,
  action: any
) => {
  switch (action.type) {
    case pending(ActionType.PLAYLISTS):
      return { ...state, playlists: { ...state.playlists, isLoading: action.payload} };
    case error(ActionType.PLAYLISTS):
      return {
        ...state,
        playlists: {
          ...state.playlists,
          error: action.payload,
        },
      };
    case success(ActionType.PLAYLISTS):
      return {
        ...state,
        playlists: {
          ...state.playlists,
          payload: action.payload,
        },
      };
    default:
      return state;
  }
};

const pending = (actionType: ActionType) => actionType + "_PENDING";
const error = (actionType: ActionType) => actionType + "_ERROR";
const success = (actionType: ActionType) => actionType + "_SUCCESS";

export default { ActionType, reducer, pending, error, success };
