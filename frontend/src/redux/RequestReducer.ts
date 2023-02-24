import RequestConfig from "../config/RequestConfig.json";

enum ActionType {
  PLAYLISTS,
  SPOTIFY_TOKEN,
  ANTHEM,
}

const elementInitialState = { isLoading: false, error: null, payload: null };

const initialState: IRequestContentInitialState = {
  playlists: { ...elementInitialState, payload: [] },
  spotifyToken: elementInitialState,
  anthem: elementInitialState,
};

interface IRequestElementState {
  isLoading: boolean;
  error: string | null;
  payload: any;
}

interface IRequestContentInitialState {
  playlists: IRequestElementState;
  spotifyToken: IRequestElementState;
  anthem: IRequestElementState;
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
    case pending(ActionType.ANTHEM):
      return {
        ...state,
        anthem: { ...state.anthem, isLoading: action.payload },
      };
    case error(ActionType.ANTHEM):
      return {
        ...state,
        anthem: {
          ...state.anthem,
          error: action.payload,
        },
      };
    case success(ActionType.ANTHEM):
      return {
        ...state,
        anthem: {
          ...state.anthem,
          payload: action.payload,
        },
      };
    default:
      return state;
  }
};

const pending = (actionType: ActionType) =>
  actionType + RequestConfig.PENDING_STATE;
const error = (actionType: ActionType) =>
  actionType + RequestConfig.ERROR_STATE;
const success = (actionType: ActionType) =>
  actionType + RequestConfig.SUCCESS_STATE;

export default { ActionType, reducer, pending, error, success };
