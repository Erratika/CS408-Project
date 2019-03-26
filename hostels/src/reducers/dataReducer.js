import {FETCH_DATA} from "../actions/types";

const initialState = {
	locations:[]
};

export default function (state = initialState, action) {
	switch (action.type) {
	case FETCH_DATA:
		return {
			...state,
			locations: action.payload
		};
	default:
		return state;

	}
}