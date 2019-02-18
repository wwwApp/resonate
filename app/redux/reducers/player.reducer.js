export const TOGGLE_PLAYER_VIEW = "TOGGLE_PLAYER_VIEW";

var defaultState = {
  isFull: false
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case TOGGLE_PLAYER_VIEW:
      return { ...state, isFull: !state.isFull };
    default:
      return state;
  }
}

export function togglePlayerView() {
  return {
    type: TOGGLE_PLAYER_VIEW
  };
}
