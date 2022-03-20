sap.ui.define(
    ["sap/ui/core/UIComponent", "com/sap/ui5community/model/models", "sap/ui/model/json/JSONModel"],
    /**
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     */
    function (UIComponent, models, JSONModel) {
        "use strict";

        return UIComponent.extend("com.sap.ui5community.Component", {
            metadata: {
                manifest: "json",
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                const settingsModel = new JSONModel({
                    filter: "all",
                    tokens: [],
                    search: ""
                });
                this.setModel(settingsModel, "settings");

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            },
        });
    }
);
