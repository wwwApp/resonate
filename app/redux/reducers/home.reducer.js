export const HOME_SET_MOOD = "home/SET_MOOD_HOME";

export const HOME_TOGGLE_TAG = "home/TOGGLE_TAG";

export const LOAD_HOME = "home/LOAD";
export const LOAD_HOME_SUCCESS = "home/LOAD_SUCCESS";
export const LOAD_HOME_FAIL = "home/LOAD_FAIL";

let tags = {
	generic: ["Holiday", "Vacation", "Late Night", "Early Morning", "Celebration", "Classical", "Driving", "Home", "International", "Religious"],
	calm: ["Background", "Jazzy", "Sleepy", "Ambient", "Slow Dance", "Solo Piano", "Daydreaming", "Autumn"],
	sad: ["Rainy days", "Sad Rock", "Sad Beats", "Emo", "Ballad", "Nostalgia", "Break up", "In the dumps", "Winter",
	],
	energetic: ["Motivation", "Party", "High School", "Night Out", "Exercise/Workout", "Latin", "Club", "Summer"
	],
	happy: ["Spring", "Sunny", "In Love", "Open Road", "Beach", "Pop", "Wake Up", "Country", "Surf Rock", "Spring"
	]
}

defaultStateHome = {
	moodColor: "#ffffff",
	moodCoordinates: {
		x: 0,
		y: 0
	},
	loading: false,
	playlists: [],
	tags: tags.generic,
	selectedTags: []
};


function checkWhichTags(coordinates) {
	var x = coordinates.x;
	var y = coordinates.y;
	if (Math.abs(x) < 40 && Math.abs(y) < 40) {
		return tags.generic;
	}

	if (x >= 0 && y >= 0) {
		return tags.calm
	}
	if (x >= 0 && y < 0) {
		return tags.happy
	}
	if (x < 0 && y < 0) {
		return tags.energetic
	}
	if (x < 0 && y >= 0) {
		return tags.sad
	}
}


export default function reducer(state = defaultStateHome, action) {
	switch (action.type) {
		case HOME_SET_MOOD:
			if (state.tags != checkWhichTags(action.coordinates)) {
				return { ...state, moodColor: action.color, moodCoordinates: action.coordinates, tags: checkWhichTags(action.coordinates), selectedTags: []};
			}
			return { ...state, moodColor: action.color, moodCoordinates: action.coordinates };
		case HOME_TOGGLE_TAG:
			var selectedTagsNew = state.selectedTags.slice(0);
			let index = selectedTagsNew.indexOf(action.tag);
			if (index >= 0) {
				selectedTagsNew.splice(index, 1);
			} else {
				selectedTagsNew.push(action.tag);
			}
			return { ...state, selectedTags: selectedTagsNew};
		case LOAD_HOME:
			return { ...state, loading: true };
		case LOAD_HOME_SUCCESS:
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

export function toggleTag(tag) {
	return {
		type: HOME_TOGGLE_TAG,
		tag: tag
	};
}

export const search = () => (dispatch, getState) => {
	let latitude = getState().map.region.latitude;
	let longitude = getState().map.region.longitude;
	let moodX = getState().home.moodCoordinates.x / 2;
	let moodY = getState().home.moodCoordinates.y / 2;
	let tags = getState().home.selectedTags;
	dispatch(fetchPlaylists(latitude, longitude, moodX, moodY, tags));
};

export function fetchPlaylists(latitude, longitude, moodX, moodY, tags) {
	
	console.log("Home request", {
		latitude, 
		longitude, 
		moodX, 
		moodY, 
		tags
	})

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
