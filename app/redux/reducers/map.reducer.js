import Geocoder from 'react-native-geocoder';
Geocoder.fallbackToGoogle("AIzaSyBEgLo6oarQOKYi8cVD5gO0ONLkl1yFxWY");

export const GET_MAP_ADDR = 'map/LOAD_ADDR';
export const GET_MAP_POS = 'map/LOAD_POS';
export const RECEIVE_LOCALITY = 'map/RECEIVE_LOCALITY';
export const RECEIVE_POS = 'map/RECEIVE_POS';
export const GET_MAP_FAIL = 'map/LOAD_FAIL';

var defaultState = {
  loading: true,
  region: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.09,
    longitudeDelta: 0.09
  },
  locality: ""
}


export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case GET_MAP_ADDR:
      return { ...state, loading: true };
    case GET_MAP_POS:
      return { ...state, loading: true };
    case RECEIVE_POS:
      return { ...state, loading: false, region: action.pos };
    case RECEIVE_LOCALITY:
      return { ...state, loading: false, locality: action.locality  };
    case GET_MAP_FAIL:
      return { ...state, loading: false, error: action.error  };
    default:
      return state;
  }
}

function requestPos(pos) {
  return {
    type: GET_MAP_POS
  }
}
function requestAddr(pos) {
  return {
    type: GET_MAP_ADDR
  }
}

export function receivePos(pos) {
  return {
    type: RECEIVE_POS,
    pos
  }
}

function receiveLocality(locality) {
  return {
    type: RECEIVE_LOCALITY,
    locality
  }
}

function mapError(error) {
  return {
    type: GET_MAP_FAIL,
    error
  }
}


export const getMapAddr = (addr) => (dispatch) => {
  dispatch(requestAddr(addr))
  Geocoder.geocodeAddress(addr).then(res => {
    let pos = {
      latitude: res[0].position.lat,
      longitude: res[0].position.lng,
      latitudeDelta: 0.09,
      longitudeDelta: 0.09
    }
    dispatch(receivePos(pos))
  })
  .catch(err => console.log(err));
}

export const getMapPos = (pos) => (dispatch) => {
  dispatch(requestPos(pos))
  Geocoder.geocodePosition(pos).then(res => {
    dispatch(receiveLocality(res[0].locality))
  })
  .catch(err => dispatch(mapError(err)))
}

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
  });
};

export const initializeMap = () => (dispatch) => {
  getCurrentLocation().then(position => {
    if (position) {
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      }
      console.log("region", region)
      dispatch(receivePos(region));
      getMapPos({lat:region.latitude, lng: region.longitude});
    }
  });
}