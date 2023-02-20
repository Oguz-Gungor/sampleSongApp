enum ActionType {
  PLAYLISTS,
  SPOTIFY_TOKEN,
}

const elementInitialState = { isLoading: false, error: null, payload: [] };

const initialState: IRequestContentInitialState = {
  playlists: elementInitialState,
  spotifyToken: elementInitialState,
};

interface IRequestElementState {
  isLoading: boolean;
  error: string | null;
  payload: any;
}

interface IRequestContentInitialState {
  playlists: IRequestElementState;
  spotifyToken: IRequestElementState;
}

const reducer = (
  state: IRequestContentInitialState = initialState,
  action: any
) => {
  switch (action.type) {
    case pending(ActionType.PLAYLISTS):
      return {
        ...state,
        playlists: { ...state.playlists, isLoading: action.payload },
      };
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
    case pending(ActionType.SPOTIFY_TOKEN):
      return {
        ...state,
        spotifyToken: { ...state.spotifyToken, isLoading: action.payload },
      };
    case error(ActionType.SPOTIFY_TOKEN):
      return {
        ...state,
        spotifyToken: {
          ...state.spotifyToken,
          error: action.payload,
        },
      };
    case success(ActionType.SPOTIFY_TOKEN):
      return {
        ...state,
        spotifyToken: {
          ...state.spotifyToken,
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
