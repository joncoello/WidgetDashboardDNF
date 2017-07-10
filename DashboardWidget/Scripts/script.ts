(function () {

    var pictureUrl = 'http://localhost:28867/api/pictures';

    let widget: WidgetComponent =
        {
            id: 0,
            name: 'Dashboard Widget',
            setupWidget: (element: Element) => {

                var startIndex = 0;
                
                $.get(pictureUrl, function (data) {
                    
                    (<Array<any>>data).forEach((item) => {
                        
                        var template = '<div class=\'item\'><img src=\''+ pictureUrl +'/'+ item.id +'\'><div class=\'carousel-caption\'><h4>' + item.name + '</h4></div></div>';

                        $('.carousel-indicators').append('<li data-target="#' + element.id + '" data-slide-to="' + startIndex + '"></li>');
                        $('.carousel-inner').append(template)

                        startIndex++;
                        
                    });
                    
                    $('.item', element).first().addClass('active');

                    $(element).carousel();

                    console.log('carousel initiated');
                    
                });
                
            },
            removeWidget: (element: Element) => {

            },
            loadData: (element: Element) => {

            },
            saveCustomisation: (customisation: { [id: string]: any }): void => {

            },
            restoreCustomisation: (customisation: { [id: string]: any }): void => {

            }
        };

    WidgetManager.Instance.registerWidget(widget);

})();