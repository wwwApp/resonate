import Spotify from "rn-spotify-sdk";

export const INITIALIZE = "user/INITIALIZE";
export const LOGIN = "user/LOGIN";
export const LOGOUT = "user/LOGOUT";

export const CREATE_USER = "user/CREATE_USER";
export const CREATE_USER_SUCCESS = "user/CREATE_USER_SUCCESS";
export const CREATE_USER_FAIL = "user/CREATE_USER_FAIL";

export const GET_USER = "user/GET_USER";
export const GET_USER_SUCCESS = "user/GET_USER_SUCCESS";
export const GET_USER_FAIL = "user/GET_USER_FAIL";

export const GET_USER_SPOTIFY = "user/GET_USER_SPOTIFY";
export const GET_USER_SPOTIFY_SUCCESS = "user/GET_USER_SPOTIFY_SUCCESS";
export const GET_USER_SPOTIFY_FAIL = "user/GET_USER_SPOTIFY_FAIL";


let defaultStateUser = {
	userData: {},
	spotifyInitialized: false,
	isLoggedIn: false
};


export default function reducer(state = defaultStateUser, action) {
	switch (action.type) {
		case INITIALIZE:
			return { ...state, spotifyInitialized: action.bool };
		case LOGIN:
			return { ...state, isLoggedIn: action.bool };
		case GET_USER_SPOTIFY_SUCCESS:
			return { ...state, userData: action.payload.data}
		case CREATE_USER_SUCCESS:
			return { ...state, userData: action.payload.data}
		case LOGOUT:
			return { ...state, isLoggedIn: false, userData: {} };
		default:
			return state;
	}
}

export function setInitialized(bool) {
	return {
		type: INITIALIZE,
		bool: bool
	};
}

export function setLoggedIn(bool) {
	return {
		type: LOGIN,
		bool: bool
	};
}

export function logoutSpotify() {
	return {
		type: LOGOUT
	};
}

export const fetchUserData = () => (dispatch, getState) => {
	Spotify.getMe().then((me) => {
		console.log(me)
		dispatch(getUserBySpotifyId(me.id)).then((result) => {
			console.log(result);
			if (result.type == GET_USER_SPOTIFY_FAIL) {
				// User doesn't yet exist in database
				let user = {
					spotify_id: me.id,
					display_name: me.display_name,
					image_url: me.images[0] ? me.images[0].url : ""
				}

				dispatch(createUser(user))
			}
		})
	}).catch(err => {console.log(err)})
}

export const login = () => async (dispatch, getState) => {
	if (!await Spotify.isLoggedInAsync()) {
		console.log("not logged in")
		Spotify.login().then((loggedIn) => {
			console.log("logged in? ", loggedIn)
			if (loggedIn) {
				dispatch(setLoggedIn(true))
				dispatch(fetchUserData())
			}
			else {
			}
		})
	} else {
		dispatch(setLoggedIn(true))
		dispatch(fetchUserData())
	}
}

export const initialize = () => async (dispatch, getState) => {
	if (!await Spotify.isInitializedAsync()) {
		const spotifyOptions = {
			clientID: "dcd8765def1247768928a9a0887e625e",
			redirectURL: "http://resonate.openode.io/callback",
			scopes: ["user-read-private", "playlist-read", "playlist-read-private", "streaming"],
			tokenSwapURL: "http://resonate.openode.io/api/token/swap",
			tokenRefreshURL: "http://resonate.openode.io/api/token/refresh"
		};
		const loggedIn = Spotify.initialize(spotifyOptions);
		dispatch(setInitialized(true));
	}

	dispatch(login());

}

export function getUserBySpotifyId(id) {
	return {
		type: GET_USER_SPOTIFY,
		payload: {
			request: {
				method: "GET",
				url: `/users/spotify/` + id
			}
		}
	};
}

export function getUser(id) {
	return {
		type: GET_USER,
		payload: {
			request: {
				method: "GET",
				url: `/users/` + id
			}
		}
	};
}

export function createUser(user) {
	return {
		type: CREATE_USER,
		payload: {
			request: {
				method: "POST",
				url: `/users`,
				data: user
			}
		}
	};
}