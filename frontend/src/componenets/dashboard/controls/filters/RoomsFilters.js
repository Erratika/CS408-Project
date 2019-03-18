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
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {fetchRoomTypes} from "../../../../actions/filtersActions";


const styles = ({
    inputWrapper: {
        marginBottom: "50px",
        marginTop: "25px",
        paddingLeft: "15px",
        paddingRight: "15px"
    },
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

class RoomsFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: {min: 1, max: 24},
        };
    }

    componentWillMount() {
        this.props.fetchRoomTypes();
    }


    render() {
        const {classes} = this.props;

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="h5">
                        Rooms
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FormControl className={classes.form}>
                        <FormLabel># of beds:</FormLabel>
                        <div className={classes.inputWrapper}><InputRange draggableTrack maxValue={24} minValue={1}
                                                                          value={this.state.size} step={1}
                                                                          onChange={size => this.setState({size})}/>
                        </div>

                        <FormLabel>Room Types:</FormLabel>
                        <div className={classes.selectWrapper}><Select isMulti isSearchable
                                                                       options={this.props.roomTypesOptions}
                        /></div>

                    </FormControl>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

const mapStateToProps = state => ({
	roomTypesOptions : state.filters.roomTypesOptions,

});

export default connect(mapStateToProps,{fetchRoomTypes})(withStyles(styles)(RoomsFilters));