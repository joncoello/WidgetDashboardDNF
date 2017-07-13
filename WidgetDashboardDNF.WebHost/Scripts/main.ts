// configure grid stack

$(function () {
    var options = {
        cell_height: 20,
        vertical_margin: 10,
        horizontal_margin: 10,
        float: true,
        acceptWidgets: true,
        alwaysShowResizeHandle: true,
        animate: true
    };
    $('.grid-stack').gridstack(options);
});

// toolbox item clicked
$('#toolbox .toolbox-item').click(function () {
    console.log('toolbox item clicked: ' + event.target);

    var clicked = $(event.target);
    var templateElement = clicked.find('.widget-template').first();
    var template = templateElement.html(); // todo: replace by api call

    // dashboard grid
    var grid = $('#mainArea .grid-stack').data('gridstack');

    // wrapper html for gridstack component
    var widgetMarkup = "<div class=\"grid-stack-item\"><div class=\"grid-stack-item-content\"><div class=\"remove-widget\"><i class=\"fa fa-trash-o\"></i></div>" + template + "</div></div>";

    var width = Number(templateElement.attr("defaultwidth"));
    var height = Number(templateElement.attr("defaultheight"));

    // gridstack api call
    var widget = grid.addWidget(widgetMarkup, 0, 0, width, height);
    var elementToUse = $(widget).find('.widget').first(); // requires widget developer to class their html with .widget
    var instance = WidgetManager.Instance.createWidget(elementToUse.get(0), templateElement.attr("name"));

    $(widget).find('.remove-widget').click(function () {
        grid.removeWidget(widget.get(0));
        instance.widgetType.removeWidget(instance.element);
    });

});

$('#saveLayout').click(function () {

    WidgetManager.Instance.saveLayout();

    var layout = WidgetManager.Instance.loadLayout();
    var json = JSON.stringify(layout);

    $.ajax({
        dataType: "json",
        contentType: "application/json",
        method: "POST",
        url: 'api/layout',
        data: JSON.stringify(layout),
        success: function (result) {
            console.log(result);
        },
        error: function () {
            console.error("error")
        }
    })

});

$('#loadLayout').click(function () {

    $.get('/api/layout', (data) => {

        var widgetLayouts = <Array<{ name: string, x: string, y: string, width: string, height: string, customisation: {[id: string] : any} }>>data;

        // dashboard grid
        var grid = $('#mainArea .grid-stack').data('gridstack');

        widgetLayouts.forEach(w => {

            //get template
            var templateElement = $(document.getElementsByName(w.name)[0]);
            var template = templateElement.html();

            // wrapper html for gridstack component
            var widgetMarkup = "<div class=\"grid-stack-item\"><div class=\"grid-stack-item-content\"><div class=\"remove-widget\"><i class=\"fa fa-trash-o\"></i></div>" + template + "</div></div>";

            // gridstack api call
            var widget = grid.addWidget(widgetMarkup, Number(w.x), Number(w.y), Number(w.width), Number(w.height));
            var elementToUse = $(widget).find('.widget').first(); // requires widget developer to class their html with .widget
            
            var instance = WidgetManager.Instance.createWidget(elementToUse.get(0), templateElement.attr("name"));
            instance.widgetType.restoreCustomisation(instance.element, w.customisation);

            $(widget).find('.remove-widget').click(function () {
                grid.removeWidget(widget.get(0));

                var index = WidgetManager.Instance.Instances.indexOf(instance, 0);
                if (index > -1) {
                    WidgetManager.Instance.Instances.splice(index, 1);
                }

            });

        });

    });


});