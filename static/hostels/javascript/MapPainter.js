const wrapper = d3.select('#map-wrapper');
let width = wrapper.width;
let height = wrapper.height;
let projection = d3.geoMercator();
let path = d3.geoPath().projection(projection);

//Create SVG element and add inside wrapper.
let svg = wrapper.append("svg")
    .attr("height", height)
    .attr("width", width);

//Add zoom functionality and limit panning/zooming.
svg.call(d3.zoom()
            .scaleExtent([1,25])
            .translateExtent([[0,0],[width,height]])
            .on("zoom",zoom));
d3.json("{% static 'hostels/maps/topo_eer.json' %}").then(drawMap);


function drawMap(data) {
    projection.fitExtent([[20, 20], [width - 20, height - 20]], data);

    svg.selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "region");

    svg.append("path")
        .datum(topojson.mesh(data, data.objects.eer))
        .attr("d", path)
        .attr("class", "border");
}

function drawHostels(data) {
    svg.selectAll("path")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "hostel")
        .attr("cx", function (d) {
            return projection(d.geometry.coordinates)[0];
        })
        .attr("cy", function (d) {
            return projection(d.geometry.coordinates)[1];
        })
        .attr("r", "2px")
        .attr("fill", "red")

}

function zoom() {
    svg.selectAll("path")
        .attr('transform', d3.event.transform)
        .style('stroke-width', 1 / d3.event.transform.k + 'px');
    svg.selectAll("circle")
        .attr('transform', d3.event.transform)
        .attr('r', 2 / d3.event.transform.k + 'px')

}


