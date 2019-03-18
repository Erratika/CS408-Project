import React, {Component} from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import "react-input-range/lib/css/index.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {withStyles} from "@material-ui/core/styles";
import Select from "react-select";
import {fetchFacilities} from "../../../../actions/filtersActions";
import {connect} from "react-redux";


const styles = ({
	selectWrapper: {
		marginBottom: "10px",
		marginTop: "15px",
		paddingLeft: "15px",
		paddingRight: "15px"
	},
	form: {
		width: "100%"
	}


});

class FacilitiesFilters extends Component {
	constructor(){
		super();
		this.state= {
			selectedFacilities: []
		};
	}
	componentWillMount(){
		this.props.fetchFacilities();
	}
	handleChange = (selectedOption) => {
    this.setState({selectedFacilities: selectedOption });
  };

	render() {
		const {classes} = this.props;
		return (
			<ExpansionPanel>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
					<Typography variant="h5">
						Facilities
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<FormControl className={classes.form}>
						<FormLabel>Facilities:</FormLabel>
						<div className={classes.selectWrapper}><Select isMulti isSearchable
									 options={this.props.facilitiesOptions}
									 onChange={this.handleChange}
						/></div>

					</FormControl>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		);
	}
}

const mapStateToProps = state => ({
	facilitiesOptions : state.filters.facilitiesOptions,

});

export default connect(mapStateToProps,{fetchFacilities})(withStyles(styles)(FacilitiesFilters));