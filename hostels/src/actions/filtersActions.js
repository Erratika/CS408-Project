import {FETCH_FACILITIES,FETCH_POLICIES,FETCH_ROOMTYPES} from "./types";
import axios from "axios";

export const fetchFacilities = () => dispatch =>{
	axios.get("/api/facilities").then(facilities => dispatch({
		type:FETCH_FACILITIES,
		payload:facilities.data
	}));
};

export const fetchPolicies = () => dispatch =>{
	axios.get("/api/policies").then(policies => dispatch({
		type:FETCH_POLICIES,
		payload:policies.data
	}));
};

export const fetchRoomTypes = () => dispatch =>{
	axios.get("/api/room_types").then(room_types => dispatch({
		type:FETCH_ROOMTYPES,
		payload:room_types.data
	}));
};