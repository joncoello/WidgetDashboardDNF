(function () {
    var widget = {
        id: 0,
        name: 'Dashboard Widget',
        setupWidget: function (element) {
            $(element).find('button').click(function () {
                alert('hello widget');
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
