import React, {Component} from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {geoMercator, geoPath} from "d3-geo";

class Map extends Component {
	constructor() {
		super();
		this.state = {
			geography: [],
			hostels: []
		};
	}

	componentDidMount() {
		//Fetch Data
		d3.json("/static/hostels/maps/topo_eer.json").then((data) => {

			this.setState({geography: topojson.feature(data, data.objects.eer).features});

		});
	}


	// componentWillUpdate(){
	// 	const svg = d3.select("#map");
	// 	let width = 530;
	// 	let height = 720;
	// 	let projection = d3.geoMercator();
	// 	let path = d3.geoPath().projection(projection);
	//
	// 	//Create SVG element and add inside wrapper.
	// 	svg.attr("height", height)
	// 		.attr("width", width);
	// 	//Add zoom functionality and limit panning/zooming.
	// 	svg.call(d3.zoom()
	// 		.scaleExtent([1, 25])
	// 		.translateExtent([[0, 0], [width, height]])
	// 		.on("zoom", function () {
	// 			svg.selectAll("path")
	// 				.attr("transform", d3.event.transform)
	// 				.style("stroke-width", 1 / d3.event.transform.k + "px");
	// 			svg.selectAll("circle")
	// 				.attr("transform", d3.event.transform)
	// 				.attr("r", 2 / d3.event.transform.k + "px");
	// 		}));
	//
	//
	// 	projection = d3.geoMercator().fitExtent([[20, 20], [width - 20, height - 20]], this.state.geography);
	// 	path = d3.geoPath().projection(projection);
	//
	// 	svg.selectAll("path")
	// 		.data(this.state.geography.features)
	// 		.enter()
	// 		.append("path")
	// 		.attr("d", path)
	// 		.attr("class", "region");
	//
	//
	// 	svg.append("path")
	// 		.datum(topojson.mesh(this.state.geography, this.state.geography.features))
	// 		.attr("d", path)
	// 		.attr("class", "boundary");
	//
	//
	// 	svg.selectAll("circle").remove();
	// 	svg.selectAll("path")
	// 		.data(this.state.geography.features)
	// 		.enter()
	// 		.append("circle")
	// 		.attr("class", "hostel")
	// 		.attr("cx", function (d) {
	// 			return projection(d.geometry.coordinates)[0];
	// 		})
	// 		.attr("cy", function (d) {
	// 			return projection(d.geometry.coordinates)[1];
	// 		})
	// 		.attr("r", "2px")
	// 		.attr("fill", "red");
	// }
	projection() {
		return geoMercator()
			.scale(3000)
			.translate([530 / 2, 720 / 2])
			.center([-4, 57.5]);
	}


	render() {
		return <svg id="map" viewBox={"0 0 530 720"} preserveAspectRatio={"xMidYMid meet"}>
			<g className="countries">
				{
					this.state.geography.map((d, i) => (
						<path
							key={`path-${ i }`}
							d={geoPath().projection(this.projection())(d)}
							className="country"
							stroke="#FFFFFF"
							strokeWidth={0.5}
						/>
					))
				}
			</g>
			<g className={"hostels"}>
				{
					this.state.hostels.map((hostel, i) => (
						<circle
							key={`marker-${i}`}
							cx={this.projection()(hostel.coordinates)[0]}
							cy={this.projection()(hostel.coordinates)[1]}
							fill="#E91E63"
							stroke="#FFFFFF"
							className="hostel"
						/>
					))
				}

			</g>


		</svg>
			;
	}
}

export default Map;