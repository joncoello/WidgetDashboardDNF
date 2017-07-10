(function () {
    var pictureUrl = 'http://localhost:28867/api/pictures';
    var widget = {
        id: 0,
        name: 'Dashboard Widget',
        setupWidget: function (element) {
            var startIndex = 0;
            $.get(pictureUrl, function (data) {
                data.forEach(function (item) {
                    var template = '<div class=\'item\'><img src=\'' + pictureUrl + '/' + item.id + '\'><div class=\'carousel-caption\'><h4>' + item.name + '</h4></div></div>';
                    $('.carousel-indicators').append('<li data-target="#' + element.id + '" data-slide-to="' + startIndex + '"></li>');
                    $('.carousel-inner').append(template);
                    startIndex++;
                });
                $('.item', element).first().addClass('active');
                $(element).carousel();
                console.log('carousel initiated');
            });
        },
        removeWidget: function (element) {
        },
        loadData: function (element) {
        },
        saveCustomisation: function (customisation) {
        },
        restoreCustomisation: function (customisation) {
        }
    };
    WidgetManager.Instance.registerWidget(widget);
})();
