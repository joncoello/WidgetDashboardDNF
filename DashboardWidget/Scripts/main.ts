(function () {

    let widget: WidgetComponent =
        {
            id: 0,
            name: 'Dashboard Widget',
            setupWidget: (element: Element) => {
                $(element).find('button').click(function () {
                    alert('hello widget');
                });
            },
            removeWidget: (element: Element) => {

            },
            loadData: (element: Element) => {

            },
            saveCustomisation: (element, customisation) => {
                customisation['mysetting'] = $('.myTextbox', element).val();
            },
            restoreCustomisation: (element, customisation) => {
                $('.myTextbox', element).val(customisation['mysetting']);
            }
        };

    WidgetManager.Instance.registerWidget(widget);

})();