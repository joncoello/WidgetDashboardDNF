(function () {
    var widget = {
        id: 0,
        name: 'Dashboard Widget',
        setupWidget: function (element) {
            $(element).carousel("pause").removeData();
            $(element).carousel(0);
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
