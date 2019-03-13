import React, {Component} from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {withStyles} from "@material-ui/core/styles";


const styles = ({
	inputWrapper: {
		marginBottom: "50px",
		marginTop: "25px",
		paddingLeft: "15px",
		paddingRight: "15px"
	},
	form: {
		width: "100%"
	}


});

class GeneralFilters extends Component {

	constructor(props) {
		super(props);
		this.state = {
			price: {min: 20, max: 50},
			rating: {min: 0, max: 10}

		};
	}


	render() {
		const {classes} = this.props;

		return (
			<ExpansionPanel square>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
					<Typography variant="h5">
						General
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<FormControl className={classes.form}>

						<FormLabel>Average Price:</FormLabel>
						<div className={classes.inputWrapper}><InputRange draggableTrack maxValue={400} minValue={0}
																		  value={this.state.price} step={0.5}
																		  onChange={price => this.setState({price})}
																		  formatLabel={value => "£"+ value.toFixed(2)}

						/></div>
						<FormLabel>Overall Rating:</FormLabel>
						<div className={classes.inputWrapper}><InputRange draggableTrack maxValue={10} minValue={0}
																		  value={this.state.rating} step={0.1}
																		  onChange={rating => this.setState({rating})}
																		  formatLabel={value => value.toFixed(1)}/>
						</div>

					</FormControl>


				</ExpansionPanelDetails>
			</ExpansionPanel>
		);
	}
}

export default withStyles(styles)(GeneralFilters);