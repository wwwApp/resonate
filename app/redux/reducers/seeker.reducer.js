export const INCREMENT = "play";
export const RESET = "reset";

var defaultState = {
  counter: 0,
  percentage: 0
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, counter: counter + 1, percentage: (counter / action.payload.duration) * 100  };
    case RESET:
      return { ...state, counter: 0, percentage: 0 };
    default:
      return state;
  }
}

export function incrementSeeker(duration) {
  return {
    type: INCREMENT,
    payload: duration
  };
}

export function resetSeeker() {
    return {
      type: RESET
    };
  }
  
