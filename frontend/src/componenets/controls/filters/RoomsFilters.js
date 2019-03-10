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
import Select from "react-select";

class RoomsFilters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			size: {min: 1, max: 24},
			selectedTypes:[],
			typeOptions:[{value:1, label:"TV"}]
		};
	}
	handleChange = (selectedTypes) => {
    this.setState({ selectedTypes });
  };

	render() {
		return (
			<ExpansionPanel>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
					<Typography variant="h5">
						Rooms
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<FormControl>
						<FormLabel>Room Size:</FormLabel>
						<InputRange draggableTrack maxValue={24} minValue={1}
							value={this.state.size} step={1}
							onChange={size => this.setState({size})}/>

						<FormLabel>Room Types:</FormLabel>
						<Select isMulti isSearchable
							value={this.state.selectedTypes}
							onChange={this.handleChange}
							options={this.state.typeOptions}
						/>

					</FormControl>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		);
	}
}

export default RoomsFilters;