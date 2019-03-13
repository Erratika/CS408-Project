import React, {Component} from 'react';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {withStyles} from "@material-ui/core/styles";


class ReviewsFilters extends Component {


	render() {
		return (
			<ExpansionPanel>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
					<Typography variant="h5">
						Reviews
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<FormControl>

					</FormControl>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		);
	}
}


export default ReviewsFilters;