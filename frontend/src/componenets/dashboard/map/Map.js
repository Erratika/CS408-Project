import React, {Component} from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {geoMercator, geoPath} from "d3-geo";
import connect from "react-redux/es/connect/connect";
import {feature} from "topojson-client";

class Map extends Component {
	constructor() {
		super();
		this.state = {
			mapData: [],
		};
	}

	static projection() {
		return geoMercator()
			.scale(100)
			.translate([800 / 2, 450 / 2]);
	}

	componentDidMount() {
		fetch("/static/hostels/maps/topo_eer.json")
			.then(response => {
				if (response.status !== 200) {
					console.log(`There was a problem: ${response.status}`);
					return;
				}
				response.json().then(mapData => {
					this.setState({
						mapData: feature(mapData, mapData.objects).features,
					});
				});
			});
	}

	render() {
		return (
			<svg width={800} height={450} viewBox="0 0 800 450">
				<g className="countries">
					{
						this.state.mapData.map((d, i) => (
							<path
								key={`path-${ i }`}
								d={Map.projection(Map.projection())(d)}
								className="country"
								fill={`rgba(38,50,56,${1 / this.state.mapData.length * i})`}
								stroke="#FFFFFF"
								strokeWidth={0.5}
							/>
						))
					}
				</g>
				<g className="markers">
				</g>
			</svg>
		);
	}
}
const mapStateToProps = state => ({
	locations: state.data.locations,
});

export default connect(mapStateToProps)(Map);