var config = (function () {
    function config() {
        this.apiUrl = 'http://dev:1234/api';
    }
    return config;
}());

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
        saveCustomisation: function (element, customisation) {
            customisation['mysetting'] = $('.myTextbox', element).val();
        },
        restoreCustomisation: function (element, customisation) {
            $('.myTextbox', element).val(customisation['mysetting']);
        }
    };
    WidgetManager.Instance.registerWidget(widget);
})();
