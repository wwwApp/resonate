export const TOGGLE_PLAYER_VIEW = "player/toggle_player_view";
export const TOGGLE_PLAY = "player/toggle_play";
export const PUSH_TRACKS = "player/get_tracks";
export const INCREMENT = "player/play";
export const RESET = "player/reset";
export const GET_CURRENT_TRACK = "player/get_current_track";
export const FORWARD = "player/forward";
export const BACKWARD = "player/backward";
export const REPLAY = "player/replay";
export const REPLAY_BACK = "player/replay_back";
export const TOGGLE_SHUFFLE = "player/toggle_shuffle";
export const SHUFFLE = "player/shuffle";

var defaultState = {
  isPlaying: false,
  toggleIcon: "ios-play",
  isFull: false,
  isShuffle: false,
  counter: 0,
  percentage: 0,
  currentTrack: {},
  currentTrackIndex: -1,
  tracks: []
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case TOGGLE_PLAYER_VIEW:
      return { ...state, isFull: !state.isFull };
    case TOGGLE_PLAY:
      return {
        ...state,
        isPlaying: !state.isPlaying,
        toggleIcon: state.isPlaying ? "ios-play" : "ios-pause"
      };
    case PUSH_TRACKS:
      return { ...state, tracks: action.tracks, currentTrackIndex: 0,
      currentTrack: action.tracks[0],
      counter: 0, 
      percentage: 0
      };
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
        percentage:
          (state.counter / Math.floor(state.currentTrack.duration / 1000)) * 100
      };
    case RESET:
      return { ...state, counter: 0, percentage: 0 };

    case GET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: state.tracks[state.currentTrackIndex]
      };
    case FORWARD:
      return {
        ...state,
        currentTrackIndex: state.currentTrackIndex + 1,
        currentTrack: state.tracks[state.currentTrackIndex]
      };
    case BACKWARD:
      return {
        ...state,
        currentTrackIndex: state.currentTrackIndex - 1,
        currentTrack: state.tracks[state.currentTrackIndex]
      };
    case REPLAY:
      return {
        ...state,
        currentTrackIndex: 0,
        currentTrack: state.tracks[state.currentTrackIndex]
      };
    case REPLAY_BACK:
      return {
        ...state,
        currentTrackIndex: state.tracks.length - 1,
        currentTrack: state.tracks[state.currentTrackIndex]
      };
    case TOGGLE_SHUFFLE:
      return {
        ...state,
        isShuffle: !state.isShuffle
      };
    case SHUFFLE:
      return {
        ...state,
        currnetTrackIndex: Math.floor(Math.random() * state.tracks.length),
        currentTrack: state.tracks[state.currentTrackIndex]
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

export function pushTracks(tracks) {
  return {
    type: PUSH_TRACKS,
    tracks: tracks
  };
}

export function getCurrentTrack() {
  return {
    type: GET_CURRENT_TRACK
  };
}

export function replay() {
  return {
    type: REPLAY
  };
}

export function replay_back() {
  return {
    type: REPLAY_BACK
  };
}

export function forward() {
  return {
    type: FORWARD
  };
}

export function backward() {
  return {
    type: BACKWARD
  };
}

export function toggleShuffle() {
  return {
    type: TOGGLE_SHUFFLE
  };
}

export function shuffle() {
  return {
    type: SHUFFLE
  };
}
