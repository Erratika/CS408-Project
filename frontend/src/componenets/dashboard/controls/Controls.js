import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core/styles";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import InputRange from "react-input-range";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import connect from "react-redux/es/connect/connect";
import Select from "react-select";
import {fetchFacilities, fetchPolicies, fetchRoomTypes} from "../../../actions/filtersActions";
import "react-input-range/lib/css/index.css";

const styles = ({
    controls: {
        height: "100%",
        overflow:"auto",
        maxHeight:"100%"
    },

    selectWrapper: {
        marginBottom: "10px",
        marginTop: "15px",
        paddingLeft: "15px",
        paddingRight: "15px"
    },
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

class Controls extends Component {
    constructor() {
        super();
        this.state = {
            selectedFacilities: [],
            selectedPolicies: [],
            selectedTypes: [],
            selectedPrice: {min: 20, max: 50},
            selectedRating: {min: 0, max: 10},
            selectedSize: {min: 1, max: 24},
        }
    }

    componentWillMount() {
        this.props.fetchFacilities();
        this.props.fetchPolicies();
        this.props.fetchRoomTypes();
    }

    render() {
        const {classes} = this.props;
        return <Paper className={classes.controls}>
            <ExpansionPanel square defaultExpanded>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="h5">
                        General
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FormControl className={classes.form}>
                        <FormLabel>Average Price:</FormLabel>
                        <div className={classes.inputWrapper}>
                            <InputRange draggableTrack
                                        maxValue={400}
                                        minValue={0}
                                        value={this.state.selectedPrice}
                                        step={0.5}
                                        onChange={price => this.setState({selectedPrice: price})}
                                        formatLabel={value => "£" + value.toFixed(2)}
                            />
                        </div>
                        <FormLabel>Overall Rating:</FormLabel>
                        <div className={classes.inputWrapper}>
                            <InputRange draggableTrack
                                        maxValue={10}
                                        minValue={0}
                                        value={this.state.selectedRating}
                                        step={0.1}
                                        onChange={rating => this.setState({selectedRating: rating})}
                                        formatLabel={value => value.toFixed(1)}/>
                        </div>
                    </FormControl>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="h5">
                        Rooms
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FormControl className={classes.form}>
                        <FormLabel># of beds:</FormLabel>
                        <div className={classes.inputWrapper}>
                            <InputRange draggableTrack
                                        maxValue={24}
                                        minValue={1}
                                        value={this.state.selectedSize}
                                        step={1}
                                        onChange={size => this.setState({selectedSize: size})}/>
                        </div>
                        <FormLabel>Room Types:</FormLabel>
                        <div className={classes.selectWrapper}>
                            <Select isMulti
                                    isSearchable
                                    options={this.props.roomTypesOptions}
                                    value={this.state.selectedTypes}
                                    onChange={selected => this.setState({selectedTypes: selected})}
                            /></div>
                    </FormControl>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="h5">
                        Facilities
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FormControl className={classes.form}>
                        <FormLabel>Facilities:</FormLabel>
                        <div className={classes.selectWrapper}>
                            <Select isMulti
                                    isSearchable
                                    options={this.props.facilitiesOptions}
                                    value={this.state.selectedFacilities}
                                    onChange={selected => this.setState({selectedFacilities: selected})}
                            />
                        </div>

                    </FormControl>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="h5">
                        Policies
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FormControl className={classes.form}>
                        <FormLabel>Policies:</FormLabel>
                        <div className={classes.selectWrapper}>
                            <Select isMulti
                                    isSearchable
                                    options={this.props.policiesOptions}
                                    value={this.state.selectedPolicies}
                            /></div>
                    </FormControl>
                </ExpansionPanelDetails>
            </ExpansionPanel>

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
        </Paper>;

    }
}

const mapStateToProps = state => ({
    policiesOptions: state.filters.policiesOptions,
    facilitiesOptions: state.filters.facilitiesOptions,
    roomTypesOptions: state.filters.roomTypesOptions,
});

export default connect(mapStateToProps, {fetchRoomTypes, fetchFacilities, fetchPolicies})(withStyles(styles)(Controls));