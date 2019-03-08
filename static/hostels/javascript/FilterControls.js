function initialiseSliders() {

    $("#slider-price").slider({
        range: true,
        min: 0,
        max: 350,
        values: [10, 100],
        step: 0.50,
        slide: function (event, ui) {
            $("#price-display").text("£" + ui.values[0].toFixed(2) + " - £" + ui.values[1].toFixed(2));
        },
        stop: function (event, ui) {
            getLocations()
        }
    });
    $("#price-display").text("£" + $("#slider-price").slider("values", 0).toFixed(2) +
        " - £" + $("#slider-price").slider("values", 1).toFixed(2));


    $("#slider-rating").slider({
        range: true,
        min: 0.0,
        max: 10.0,
        values: [2, 8],
        step: 0.1,
        slide: function (event, ui) {
            $("#rating-display").text(ui.values[0].toFixed(1) + " - " + ui.values[1].toFixed(1));

        },
        stop: function (event, ui) {
            getLocations()

        }
    });
    $("#rating-display").text($("#slider-rating").slider("values", 0).toFixed(1) + " - " +
        $("#slider-rating").slider("values", 1).toFixed(1));


    $("#slider-size").slider({
        range: true,
        min: 1,
        max: 24,
        values: [7, 17],
        step: 1,
        slide: function (event, ui) {
            $("#size-display").text(ui.values[0] + " - " + ui.values[1]);
        },
        change: function (event, ui) {
            getLocations()
        }
    });
    $("#size-display").text($("#slider-size").slider("values", 0) + " - " +
        $("#slider-size").slider("values", 1));

}

function getLocations() {
    let query = $.param(getValues());
    $.getJSON({
        url: "/api/locations?" + query,
        complete: function (res) {
            drawHostels(JSON.parse(res.responseText))
        }
    });
}

function getValues() {
    let params = {};
    params['price-min'] = $("#slider-price").slider("values", 0);
    params['price-max'] = $("#slider-price").slider("values", 1);
    params['rating-min'] = $("#slider-rating").slider("values", 0);
    params["rating-max"] = $("#slider-rating").slider("values", 1);
    params['room_size-min'] = $("#slider-size").slider("values", 0);
    params["room_size-max"] = $("#slider-size").slider("values", 1);
    $("input:checked").each(function () {
        if (Array.isArray(params[$(this).attr('name')])) {
            params[$(this).attr('name')].push(parseInt($(this).attr('value')));
        } else {
            params[$(this).attr('name')] = [parseInt($(this).attr('value'))]
        }

    });
    return params
}



