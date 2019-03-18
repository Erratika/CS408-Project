import React, {Component} from "react";
import GeneralFilters from "./filters/GeneralFilters";
import RoomsFilters from "./filters/RoomsFilters";
import ReviewsFilters from "./filters/ReviewsFilters";
import PoliciesFilters from "./filters/PoliciesFilters";
import FacilitiesFilters from "./filters/FacilitiesFilters";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core/styles";

const styles = ({
	controls: {
		height: "100%",
	},

});

class Controls extends Component {



	render() {
		const {classes} = this.props;
		return <Paper className = {classes.controls}>
			<GeneralFilters/>
			<RoomsFilters/>
			<FacilitiesFilters/>
			<PoliciesFilters/>
			<ReviewsFilters/>
		</Paper>;

	}
}

export default withStyles(styles)(Controls);