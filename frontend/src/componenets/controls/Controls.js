import React, {Component} from "react";
import GeneralFilters from "./filters/GeneralFilters";
import RoomsFilters from "./filters/RoomsFilters";
import ReviewsFilters from "./filters/ReviewsFilters";
import PoliciesFilters from "./filters/PoliciesFilters";
import FacilitiesFilters from "./filters/FacilitiesFilters";
import Paper from "@material-ui/core/Paper";


class Controls extends Component {



	render() {
		return <Paper>
			<GeneralFilters/>
			<RoomsFilters/>
			<FacilitiesFilters/>
			<PoliciesFilters/>
			<ReviewsFilters/>
		</Paper>;

	}
}

export default Controls;