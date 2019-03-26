import {FETCH_DATA} from "./types";
import axios from "axios";
import querystring from "querystring";

export const fetchData = (options) => dispatch => {
	let params = {
		price_min: options.selectedPrice.min,
		price_max: options.selectedPrice.max,
		rating_min: options.selectedRating.min,
		rating_max: options.selectedRating.max,
		size_min: options.selectedSize.min,
		size_max: options.selectedSize.max,
		facilities: options.selectedFacilities.map(f => f.value),
		policies: options.selectedPolicies.map(p => p.value),
		roomTypes: options.selectedTypes.map(t => t.value),
	};
	console.log(params);
	let query = querystring.stringify(params);
	axios.get("/api/locations" +"?"+ query).then(data => {
		dispatch({
			type: FETCH_DATA,
			payload: data.data.features,
		});
	});
};

