export const GET_PLAYLIST = "playlist/LOAD";
export const GET_PLAYLIST_SUCCESS = "playlist/LOAD_SUCCESS";
export const GET_PLAYLIST_FAIL = "playlist/LOAD_FAIL";
export const TOGGLE_PLAYLIST_VIEW = "playlist/TOGGLE_PLAYLIST_VIEW";

var defaultState = {
  loading: true,
  playlist: {},
  isVisible: false
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case GET_PLAYLIST:
      return { ...state, loading: true };
    case GET_PLAYLIST_SUCCESS:
      return { ...state, loading: false, playlist: action.payload.data };
    case GET_PLAYLIST_FAIL:
      return {
        ...state,
        loading: false,
        error: "Error while fetching playlist details"
      };
    case TOGGLE_PLAYLIST_VIEW:
      return {
        ...state,
        isVisible: !state.isVisible
      };
    default:
      return state;
  }
}

export function togglePlaylistView() {
  return {
    type: TOGGLE_PLAYLIST_VIEW
  };
}

export function getPlaylist(id) {
  return {
    type: GET_PLAYLIST,
    payload: {
      request: {
        url: `/playlists/${id}`
      }
    }
  };
}
