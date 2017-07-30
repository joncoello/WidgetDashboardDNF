"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WidgetModule;
(function (WidgetModule) {
    /**
    * Widget settings including event callbacks
    */
    var WidgetComponent = (function () {
        function WidgetComponent(name) {
            this.name = name;
        }
        return WidgetComponent;
    }());
    WidgetModule.WidgetComponent = WidgetComponent;
    /**
    * An individual instance of a widget on a dashboard
    */
    var WidgetInstance = (function () {
        function WidgetInstance(id, widgetType, element) {
            this.id = id;
            this.widgetType = widgetType;
            this.element = element;
        }
        return WidgetInstance;
    }());
    WidgetModule.WidgetInstance = WidgetInstance;
    /**
    * Singleton for managing widgets on a page widgets register themselves then can be centrally managed.
    */
    var WidgetManager = (function () {
        function WidgetManager() {
            // layout
            this._layout = [];
            // pub/sub hub
            this._subscribers = {}; // todo: should it be an any for messgae?
            this.Widgets = new Array();
            this.Instances = new Array();
            this._lastWidgetID = 0;
            this._lastInstanceID = 0;
        }
        Object.defineProperty(WidgetManager, "Instance", {
            /**
             * Singleton property
             */
            get: function () {
                return this._instance || (this._instance = new this());
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Register a widget with the manager.
         * @param widget    the widget to register.
         */
        WidgetManager.prototype.registerWidget = function (widget) {
            this._lastWidgetID++;
            widget.id = this._lastWidgetID;
            this.Widgets.push(widget);
        };
        /**
         * Create an instance of a widget.
         * @param widget    the widget to register.
         */
        WidgetManager.prototype.createWidget = function (element, widgetName) {
            // create new instance
            this._lastInstanceID++;
            var widget = this.Widgets.filter(function (w) { return w.name === widgetName; })[0];
            var instance = new WidgetInstance(this._lastInstanceID, widget, element);
            this.Instances.push(instance);
            // fire initialisation events
            instance.widgetType.setupWidget(element);
            instance.widgetType.loadData(element);
            return instance;
        };
        /**
         * Refresh data of all widgets registered.
         */
        WidgetManager.prototype.refreshWidgets = function () {
            this.Instances.forEach(function (i) {
                i.widgetType.loadData(i.element);
            });
        };
        /**
         * Return layout of all widgets registered with manager.
         */
        WidgetManager.prototype.getLayout = function () {
            var widgetsInfo = [];
            this.Instances.forEach(function (i) {
                var e = i.element.parentElement.parentElement;
                var id = i.element.id;
                var x = e.getAttribute('data-gs-x').valueOf();
                var y = e.getAttribute('data-gs-y').valueOf();
                var width = e.getAttribute('data-gs-width').valueOf();
                var height = e.getAttribute('data-gs-height').valueOf();
                widgetsInfo.push("id:" + id + ";x:" + x + ";y:" + y + ";width:" + width + ";height:" + height);
            });
            return widgetsInfo.join(",");
        };
        WidgetManager.prototype.saveLayout = function () {
            var _this = this;
            console.log('layout saving');
            this._layout.length = 0; // todo: best way of clearing an array ?
            this.Instances.forEach(function (i) {
                var widgetContainer = i.element.parentElement;
                var widgetElement = widgetContainer.parentElement;
                var customisation = {};
                i.widgetType.saveCustomisation(widgetElement, customisation);
                _this._layout.push({
                    name: i.widgetType.name,
                    x: widgetElement.getAttribute('data-gs-x').valueOf(),
                    y: widgetElement.getAttribute('data-gs-y').valueOf(),
                    width: widgetElement.getAttribute('data-gs-width').valueOf(),
                    height: widgetElement.getAttribute('data-gs-height').valueOf(),
                    customisation: customisation
                });
            });
            console.log('layout saved');
            console.log(this._layout);
        };
        WidgetManager.prototype.loadLayout = function () {
            return this._layout;
        };
        /**
        * Register a subscriber to an event
        * @param eventName    the name of the event to subscribe to
        * @param callback    the method to invoke when the event occurs
        */
        WidgetManager.prototype.registerSubscriber = function (eventName, delegate) {
            console.log('registering ' + eventName);
            var eventNameLower = eventName.toLowerCase();
            if (this._subscribers[eventNameLower] == null) {
                this._subscribers[eventNameLower] = [];
            }
            // todo: prevent double subscription ? - v2
            this._subscribers[eventNameLower].push(delegate);
            console.log('registered ' + eventName);
        };
        /**
        * Unregister a subscriber to an event
        * @param eventName    the name of the event to subscribe to
        * @param callback    the method to invoke when the event occurs
        */
        WidgetManager.prototype.unregisterSubscriber = function (eventName, delegate) {
            console.log('unregistering ' + eventName);
            var eventNameLower = eventName.toLowerCase();
            if (this._subscribers[eventNameLower] == null) {
                this._subscribers[eventNameLower] = [];
            }
            // todo: prevent double subscription ? - v2
            var indexOfItemToRemove = this._subscribers[eventNameLower].indexOf(delegate);
            this._subscribers[eventNameLower].splice(indexOfItemToRemove);
            console.log('unnregistered ' + eventName);
        };
        /**
        * Raise the event
        * @param eventName    the name of the event to subscribe to
        * @param message    the message to pass to the callback - todo: typed?
        */
        WidgetManager.prototype.raiseEvent = function (eventName, message) {
            var eventNameLower = eventName.toLowerCase();
            // prevent double subscription ?
            if (this._subscribers[eventNameLower] != null) {
                this._subscribers[eventNameLower].forEach(function (e) {
                    try {
                        e.callback(message, e.instanceElement);
                    }
                    catch (e) {
                        console.error('error invoking subsciber for event ' + eventName);
                        console.error(e);
                    }
                });
            }
        };
        return WidgetManager;
    }());
    WidgetModule.WidgetManager = WidgetManager;
    var WidgetDelegate = (function () {
        function WidgetDelegate() {
        }
        return WidgetDelegate;
    }());
    WidgetModule.WidgetDelegate = WidgetDelegate;
})(WidgetModule = exports.WidgetModule || (exports.WidgetModule = {}));
