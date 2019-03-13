import {FETCH_FACILITIES, FETCH_ROOMTYPES, FETCH_POLICIES} from "../actions/types";

const initialState = {
	facilitiesOptions: [],
	facilitiesSelected: [],
	policiesOptions: [],
	policiesSelected: [],
	roomTypesOptions: [],
	roomTypesSelected: [],
};

export default function (state = initialState, action) {

	switch (action.type) {
	case FETCH_FACILITIES:
		return {
			...state,
			facilitiesOptions: action.payload
		};
	case FETCH_POLICIES:
		return {
			...state,
			policiesOptions: action.payload
		};
	case FETCH_ROOMTYPES:
		return {
			...state,
			roomTypesOptions: action.payload
		};
	default:
		return state;

	}
}