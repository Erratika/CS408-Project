import {FETCH_DATA} from "./types";
import axios from "axios";

export const fetchData = (options) => dispatch =>{
	console.log("Fetching locations");
	axios.get("/api/locations").then(data => {dispatch({
		type:FETCH_DATA,
		payload:data.data.features,
	});
	console.log(data)
	});
};

