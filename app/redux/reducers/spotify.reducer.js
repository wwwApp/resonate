import Spotify from "rn-spotify-sdk";

export const SEARCH = 'spotify/SEARCH';
export const SEARCH_SUCCESS = 'spotify/SEARCH_SUCCESS';
export const SEARCH_FAIL = 'spotify/SEARCH_FAIL';

export const INIT = 'spotify/INIT';
export const INIT_SUCCESS = 'spotify/INIT_SUCCESS';
export const INIT_FAIL = 'spotify/INIT_FAIL';

defaultState = {
  loading: false,
  searchResults: [],
  term: "",
  init: false
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SEARCH:
      return { ...state, loading: true, term: action.term, searchResults: [] };
    case SEARCH_SUCCESS:
      if (state.term == action.term) {
        return { ...state, loading: false, searchResults: action.results };
      } else {
        return { ...state, loading: false, searchResults: [] };
      }
    case INIT_SUCCESS:
      return { ...state, init: true};
    case SEARCH_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

function setSearchTerm(term) {
  return {
    type: SEARCH,
    term: term
  }
}

function setResults(results, term) {
  return {
    type: SEARCH_SUCCESS,
    term: term,
    results: results
  }
}
export function initSpotify() {
  const spotifyOptions = {
    "clientID":"dcd8765def1247768928a9a0887e625e",
    "redirectURL":"http://resonate.openode.io/callback",
    "scopes":["user-read-private", "playlist-read", "playlist-read-private", "streaming"],
    "tokenSwapURL":"http://resonate.openode.io/api/token/swap",
    "tokenRefreshURL":"http://resonate.openode.io/api/token/refresh"
  };
  const loggedIn = Spotify.initialize(spotifyOptions);
  Spotify.login();

  return {
    type: INIT_SUCCESS
  }
}

export const searchTrack = (term) => (dispatch) => {
  dispatch(setSearchTerm(term));
  // search for query
  Spotify.search( term,["track"]).then( res => {
    // PARSE DATA
    let data = []
    for (item of res.tracks.items) {
      let itemData = { artists: []}
      for (artist of item.artists) {
        itemData.artists.push(artist.name);
      }
      itemData.title = item.name;
      itemData.album = item.album.name;
      itemData.image_url = item.album.images[0].url;
      itemData.spotify_id = item.id;
      itemData.duration = item.duration_ms;

      data.push(itemData);
    }

    dispatch(setResults(data, term));
  }).catch(err=> console.log("ERROR: ", err))
}