import {combineReducers} from "redux";
import filtersReducer from "./filtersReducer";
import dataReducer from "./dataReducer"


export default combineReducers({
	filters: filtersReducer,
	data:dataReducer,
});