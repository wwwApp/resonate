export const GET_PLAYLIST = "playlist/LOAD";
export const GET_PLAYLIST_SUCCESS = "playlist/LOAD_SUCCESS";
export const GET_PLAYLIST_FAIL = "playlist/LOAD_FAIL";
export const TOGGLE_PLAYLIST_VIEW = "playlist/TOGGLE_PLAYLIST_VIEW";
export const TOGGLE_HEART = "playlist/TOGGLE_HEART";
export const TOGGLE_FIRST_PLAY = "playlist/TOGGLE_FIRST_PLAY";
export const TOGGLE_PLAY = "playlist/TOGGLE_PLAY";

var defaultState = {
  loading: true,
  playlist: {},
  isVisible: false,
  isHearted: false,
  isFirstPlay: true,
  // isPlaying: false,
  // toggleIcon: "ios-play"
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
    case TOGGLE_HEART:
      return {
        ...state,
        isHearted: !state.isHearted
      };
    case TOGGLE_FIRST_PLAY:
      return {
        ...state,
        isFirstPlay: !state.isFirstPlay
      };
    // case TOGGLE_PLAY:
    //   return {
    //     ...state,
    //     isPlaying: !state.isPlaying,
    //     toggleIcon: state.isPlaying? "ios-play" : "ios-pause"
    //   };
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

export function toggleHeart() {
  return {
    type: TOGGLE_HEART
  };
}

export function toggleFirstPlay() {
  return {
    type: TOGGLE_FIRST_PLAY
  };
}

// export function togglePlay() {
//   return {
//     type: TOGGLE_PLAY
//   };
// }