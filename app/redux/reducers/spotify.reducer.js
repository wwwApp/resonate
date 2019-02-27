import Spotify from "rn-spotify-sdk";

export const SEARCH = 'spotify/SEARCH';
export const SEARCH_SUCCESS = 'spotify/SEARCH_SUCCESS';
export const SEARCH_FAIL = 'spotify/SEARCH_FAIL';

export const INIT = 'spotify/INIT';
export const INIT_SUCCESS = 'spotify/INIT_SUCCESS';
export const INIT_FAIL = 'spotify/INIT_FAIL';

export const SET_LISTS = 'spotify/SET_LISTS';

defaultState = {
  loading: false,
  searchResults: [],
  trackQueue: [
    {
      "artists": [
        "Marvin Gaye"
      ],
      "_id": "5c6ac32fe21c4e00360b5595",
      "title": "What's Going On",
      "album": "What's Going On",
      "image_url": "https://i.scdn.co/image/79cc9cb5325ea22f480989045cf62e962822803a",
      "spotify_id": "34b3a3Pz9Jlz0092LMyNAB"
    },
    {
      "artists": [
        "Janelle Monáe"
      ],
      "_id": "5c6ac32fe21c4e00360b5594",
      "title": "Make Me Feel",
      "album": "Make Me Feel",
      "image_url": "https://i.scdn.co/image/29979c0664b46f3e54b2a3f66f448c9df11f929f",
      "spotify_id": "79GsUxLyzxgnN4I1E11dtO"
    }
  ],
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
    case SET_LISTS:
      return {...state, searchResults: action.searchResults, trackQueue: action.trackQueue}
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

export function receiveResults(results, term) {
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

export function dragItem (searchRes, queue, index, offset, fromSearch) {
  console.log(offset);
  if (fromSearch) {
    item = searchRes.splice(index, 1);
    queue.splice(offset, 0, item[0]);

  } else {
    item = queue.splice(index, 1);
    searchRes.splice(offset, 0, item[0]);
  }
  return {
    type: SET_LISTS,
    searchResults: searchRes,
    trackQueue: queue
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

    dispatch(receiveResults(data, term));
  }).catch(err=> console.log("ERROR: ", err))
}