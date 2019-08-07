import React, {Component} from "react";
import Map from "./map/Map";
import Controls from "./controls/Controls";
import {withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid'

const styles = ({
	root: {
		height:"100vh",
	},
	max:{
		maxHeight: "100%"
	}

});

class Dashboard extends Component {



	render() {
		const {classes} = this.props;

		return (
			<Grid container className={classes.root}>
				<Grid item xs ={3} className={classes.max}> <Controls/>
				</Grid>
				<Grid item xs={9} className={classes.max}> <Map/>
				</Grid>

			</Grid>
		);
	}
}

export default withStyles(styles)(Dashboard);