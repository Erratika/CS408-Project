class MapPainter {
    WRAPPER = $('#map-wrapper');
    width = WRAPPER.width();
    height = WRAPPER.height();
    projection = d3.geoMercator();
    path = d3.geoPath().projection(projection);

    constructor() {
        //Create SVG element and add inside wrapper.
        this.svg = WRAPPER.append("svg")
            .attr("height", height)
            .attr("width", width);
        //Add zoom functionality and limit panning/zooming.
        this.svg.call(d3.zoom()
            .scaleExtent([1, 25])
            .translateExtent([[0, 0], [width, height]])
            .on("zoom", zoom));
    }

    drawMap(data) {
        this.projection.fitExtent([[20, 20], [width - 20, height - 20]], data);

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

    drawHostels(data) {
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
            .attr('transform', d3.event.transform)
            .style('r', 1 / d3.event.transform.k + 'px');
    }

    zoom() {
        svg.selectAll("path")
            .attr('transform', d3.event.transform)
            .style('stroke-width', 1 / d3.event.transform.k + 'px');
        svg.selectAll("circle")
            .attr('transform', d3.event.transform)
            .attr('r', 2 / d3.event.transform.k + 'px')

    }

}
