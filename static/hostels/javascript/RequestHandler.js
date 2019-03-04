//TODO Requires an instance of Map painter to call paint function on success.
class RequestHandler {

    constructor(painter, controls) {
        this.painter = painter;
        this.controls = controls;
    }
}

function getLocations() {
    let query = $.param(getValues());
    $.getJSON({
        url: "/api/locations/" + query,
        complete: this.painter.drawHostels(data)
    });
}