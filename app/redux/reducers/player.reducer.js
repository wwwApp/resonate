export const TOGGLE_PLAYER_VIEW = "toggle_player_view";
export const INCREMENT = "play";
export const RESET = "reset";
export const TOGGLE_PLAY = "toggle_play";
export const GET_CURRENT_TRACK = "get_current_track";
export const FORWARD = "forward";
export const BACKWARD = "backward";
export const REPLAY = "replay";
export const REPLAY_BACK = "replay_back";

var defaultState = {
  isPlaying: false,
  isFull: false,
  counter: 0,
  percentage: 0,
  currentTrack: {},
  currentTrackIndex: 0,
  currentPlaylist: [
    {
      title: "Track Name 1",
      artist: "Artist Name 1",
      album:
        "https://images-na.ssl-images-amazon.com/images/I/A1QsthUoerL._SY355_.jpg",
      duration: 180
    },
    {
      title: "Track Name 2",
      artist: "Artist Name 2",
      album:
        "https://ksassets.timeincuk.net/wp/uploads/sites/55/2013/04/falloutboy.jpg",
      duration: 160
    },
    {
      title: "Track Name 3",
      artist: "Artist Name 3",
      album:
        "https://djbooth.net/.image/t_share/MTUzNDg2MDEwMDAyODQzNTA1/fall-out-boy-make-america-psycho-againjpg.jpg",
      duration: 100
    }
  ]
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case TOGGLE_PLAYER_VIEW:
      return { ...state, isFull: !state.isFull };
    case TOGGLE_PLAY:
      return { ...state, isPlaying: !state.isPlaying };
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
        percentage: (state.counter / state.currentTrack.duration) * 100
      };
    case RESET:
      return { ...state, counter: 0, percentage: 0 };
    ////////////////////////////////////////////////// TESTING BELOW
    case GET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: state.currentPlaylist[state.currentTrackIndex]
      };
    case FORWARD:
      return {
        ...state,
        currentTrackIndex: state.currentTrackIndex + 1,
        currentTrack: state.currentPlaylist[state.currentTrackIndex]
      };
    case BACKWARD:
      return {
        ...state,
        currentTrackIndex: state.currentTrackIndex - 1,
        currentTrack: state.currentPlaylist[state.currentTrackIndex]
      };
    case REPLAY:
      return {
        ...state,
        currentTrackIndex: 0,
        currentTrack: state.currentPlaylist[state.currentTrackIndex]
      };
    case REPLAY_BACK:
      return {
        ...state,
        currentTrackIndex: state.currentPlaylist.length,
        currentTrack: state.currentPlaylist[state.currentTrackIndex]
      };
    default:
      return state;
  }
}

export function togglePlayerView() {
  return {
    type: TOGGLE_PLAYER_VIEW
  };
}

export function incrementSeeker() {
  return {
    type: INCREMENT
  };
}

export function resetSeeker() {
  return {
    type: RESET
  };
}

export function togglePlay() {
  return {
    type: TOGGLE_PLAY
  };
}

////////////////////////////////////////////////// TESTING BELOW

export function getCurrentTrack() {
  return {
    type: GET_CURRENT_TRACK
  };
}

export function getNextTrack() {
  if (
    defaultState.currentTrackIndex + 1 ===
    defaultState.currentPlaylist.length
  ) {
    return {
      type: REPLAY
    };
  } else {
    return {
      type: FORWARD
    };
  }
}

export function getPrevTrack() {
  if (defaultState.currentTrackIndex === 0) {
    return {
      type: REPLAY_BACK
    };
  } else {
    return {
      type: BACKWARD
    };
  }
}
