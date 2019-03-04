class FilterControls {

    constructor() {

    }

    initialiseAccordian() {
        $(".collapsible").each(function () {
            this.addEventListener('click', function () {
                $(this.nextElementSibling).toggle();
            });
        });
    }

    getValues() {
        var params = {};
        params['price-min'] = $("#slider-price").slider("values", 0);
        params['price-max'] = $("#slider-price").slider("values", 1);
        params['rating-min'] = $("#slider-rating").slider("values", 0);
        params["rating-max"] = $("#slider-rating").slider("values", 1);
        $("input:checked").each(function () {
            if (Array.isArray(params[$(this).attr('name')])) {
                params[$(this).attr('name')].push(parseInt($(this).attr('value')));
            } else {
                params[$(this).attr('name')] = [parseInt($(this).attr('value'))]
            }

        });
        return params
    }

    initialiseSliders() {

        $("#slider-price").slider({
            range: true,
            min: 0,
            max: 1500,
            values: [15.00, 35.00],
            step: 0.50,
            slide: function (event, ui) {
                $("#price-display").text("£" + ui.values[0].toFixed(2) + " - £" + ui.values[1].toFixed(2));
            }
        });
        $("#price-display").text("£" + $("#slider-price").slider("values", 0).toFixed(2) +
            " - £" + $("#slider-price").slider("values", 1).toFixed(2));


        $("#slider-rating").slider({
            range: true,
            min: 0.0,
            max: 10.0,
            values: [3.5, 6.5],
            step: 0.1,
            slide: function (event, ui) {
                $("#rating-display").text(ui.values[0].toFixed(1) + " - " + ui.values[1].toFixed(1));
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
            }
        });
        $("#size-display").text($("#slider-size").slider("values", 0) + " - " +
            $("#slider-size").slider("values", 1));

    }


}
