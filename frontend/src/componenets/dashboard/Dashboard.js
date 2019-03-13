import React, {Component} from "react";
import Map from "./map/Map";
import TagCloud from "./tagcloud/TagCloud";
import Controls from "./controls/Controls";
import {withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid'

const styles = ({
	root: {
		height:"100vh"
	},

});

class Dashboard extends Component {


	render() {
		const {classes} = this.props;

		return (
			<Grid container className={classes.root}>
				<Grid item xs ={3}> <Controls/>
				</Grid>
				<Grid item xs={5}> <Map/>
				</Grid>
				<Grid item xs = {4}>
					<TagCloud/>
					<TagCloud/>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(Dashboard);