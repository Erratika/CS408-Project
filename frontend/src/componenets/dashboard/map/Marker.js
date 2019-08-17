import React, {Component} from "react";
import PropTypes from "prop-types";

class Marker extends Component {
	render() {
		return (
			<div>
				
			</div>
		);
	}
}

Marker.propTypes = {
	point: PropTypes.arrayOf(PropTypes.number)
};

export default Marker;