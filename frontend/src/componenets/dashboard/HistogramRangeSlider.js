import React, {Component} from "react";
import PropTypes from "prop-types";
import d3 from "d3";

class HistogramRangeSlider extends Component {
	render() {

		return (
			<div>
				<input type={"range"}/>
				<input type={"range"}/>
				<svg > </svg>

			</div>
		);
	}
}

HistogramRangeSlider.propTypes = {
	min: PropTypes.number,
	max: PropTypes.number,
	step: PropTypes.number,
	data: PropTypes.object,
};

export default HistogramRangeSlider;