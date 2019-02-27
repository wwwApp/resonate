export const HOME_SET_MOOD = 'home/SET_MOOD_HOME';

defaultStateHome = {
  moodColor: "#ffffff",
  moodCoordinates: {
    x: 0,
    y: 0
  }
}

export default function reducer(state = defaultStateHome, action) {
  switch (action.type) {
    case HOME_SET_MOOD:
      return {...state, moodColor: action.color, moodCoordinates: action.coordinates}
    default:
      return state;
  }
}

export function setMood(color, coordinates) {
  return {
    type: HOME_SET_MOOD,
    color: color,
    coordinates: coordinates
  }
}
