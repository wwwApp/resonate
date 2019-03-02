export const HOME_SET_MOOD = "home/SET_MOOD_HOME";

export const LOAD_HOME = "home/LOAD";
export const LOAD_HOME_SUCCESS = "home/LOAD_SUCCESS";
export const LOAD_HOME_FAIL = "home/LOAD_FAIL";

defaultStateHome = {
	moodColor: "#ffffff",
	moodCoordinates: {
		x: 0,
		y: 0
	},
	loading: true,
	playlists: [],
	tags: [],
	selectedTags: []
};

export default function reducer(state = defaultStateHome, action) {
	switch (action.type) {
		case HOME_SET_MOOD:
			return { ...state, moodColor: action.color, moodCoordinates: action.coordinates };
		case LOAD_HOME:
			return { ...state, loading: true };
		case LOAD_HOME_SUCCESS:
			console.log(action.payload);
			return { ...state, loading: false, playlists: action.payload.data };
		case LOAD_HOME_FAIL:
			return { ...state, loading: false, error: action.error };
		default:
			return state;
	}
}

export function setMood(color, coordinates) {
	return {
		type: HOME_SET_MOOD,
		color: color,
		coordinates: coordinates
	};
}

export const search = () => (dispatch, getState) => {
	let latitude = getState().map.region.latitude;
	let longitude = getState().map.region.longitude;
	let moodX = getState().home.moodCoordinates.x / 2;
	let moodY = getState().home.moodCoordinates.y / 2;
	let tags = getState().home.selectedTags;
	dispatch(fetchPlaylists(latitude, longitude, moodX, moodY));
};

export function fetchPlaylists(latitude, longitude, moodX, moodY, tags) {
	return {
		type: LOAD_HOME,
		payload: {
			request: {
				url: "/search/location",
				params: {
					latitude: latitude,
					longitude: longitude,
					moodX: moodX,
					moodY: moodY,
					tags: tags
				}
			}
		}
	};
}
