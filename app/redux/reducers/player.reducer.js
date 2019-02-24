export const TOGGLE_PLAYER_VIEW = "toggle_player_view";
export const INCREMENT = "play";
export const RESET = "reset";
export const TOGGLE_PLAY = "toggle_play";

var defaultState = {
  isPlaying: false,
  isFull: false,
  counter: 0,
  percentage: 0,
  currentTrack: {
    title: "Track Name",
    artist: "Artist Name",
    album:
      "https://images-na.ssl-images-amazon.com/images/I/A1QsthUoerL._SY355_.jpg",
    duration: 180
  }
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
