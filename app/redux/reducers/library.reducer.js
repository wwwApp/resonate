// import Spotify from "rn-spotify-sdk";

export const FETCH_SAVED_PLAYLISTS = "library/FETCH_SAVED_PLAYLIST"
export const FETCH_SAVED_PLAYLISTS_SUCCESS = "library/FETCH_SAVED_PLAYLIST_SUCCESS"
export const FETCH_SAVED_PLAYLISTS_FAIL = "library/FETCH_SAVED_PLAYLIST_FAIL"

defaultState = {
    savedPlaylists = {},
    loading: true,
};

export default function reducer(state = defaultStateUser, action) {
	switch (action.type) {
        case FETCH_SAVED_PLAYLISTS:
            return {
                ... state,
                loading: true
            };
        case FETCH_SAVED_PLAYLISTS_SUCCESS:
            return { ...state, loading: false, savedPlaylists: action.savedPlaylists };
        case FETCH_SAVED_PLAYLISTS_FAIL:
			return { ...state, loading: false};
		default:
			return state;
	}
}

export const fetchSavedPlaylists = (accessToken) => {
    return dispatch => {
      const request = new Request(`https://api.spotify.com/v1/me/playlists`, {
        headers: new Headers({
          'Authorization': 'Bearer ' + accessToken
        })
      });
  
      fetch(request).then(res => {
        if(res.statusText === "Unauthorized") {
          window.location.href = './';
        }
        return res.json();
      }).then(res => {
        dispatch(fetchSavedPlaylistsSuccess(res.items));
      }).catch(err => {
        dispatch(fetchSavedPlaylistsFail(err));
      });
    };
  };

  export const fetchSavedPlaylistsSuccess = (playlists) => {
      return {
        type: FETCH_SAVED_PLAYLISTS_SUCCESS,
        savedPlaylists: playlists
      };
  };

  export const fetchSavedPlaylistsFail = () => {
    return {
        type: FETCH_SAVED_PLAYLISTS_FAIL
    }
  };