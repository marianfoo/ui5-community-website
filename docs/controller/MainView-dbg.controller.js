sap.ui.define(
  ["./BaseController", "com/sap/ui5community/model/formatter", "sap/ui/model/Filter", "sap/ui/model/FilterOperator"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, formatter, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("com.sap.ui5community.controller.MainView", {
      onInit: function () {},

      onUpdateToken: function (oEvent) {
        const model = this.getView().getModel("settings");
        let value = model.getProperty("/search");
        value = value.trim();
        let tokenArray = model.getProperty("/tokens");

        let addOrRemove = oEvent.getParameter("type");
        if (addOrRemove === "added") {
          tokenArray.push(oEvent.getParameter("addedTokens")[0].getProperty("key"));
        } else if (addOrRemove === "removed") {
          let removedToken = oEvent.getParameter("removedTokens")[0].getProperty("key");
          tokenArray = tokenArray.filter((token) => token !== removedToken);
        }
        this._applySearchFilter(value, tokenArray);
      },

      /**
       * Event handler for navigating back.
       * We navigate back in the browser history
       * @public
       */
      onNavBack: function () {
        history.go(-1);
      },

      onPress: function (oEvent) {
        // get object name from oevent
        const objectName = oEvent.getSource().getBindingContext("packages").getObject().name;
        //route to object view
        this.navTo("RouteObjectView", {
          name: objectName,
        });
      },
      liveSearch: function (oEvent) {
        const model = this.getView().getModel("settings");
        let value = oEvent.getParameter("value").trim();
        let tokenArray = model.getProperty("/tokens");

        this._applySearchFilter(value, tokenArray);
      },

      _applySearchFilter: function (value, valueTypes) {
        if (!value) {
          value = "";
        }
        // make sure values are set in model, needed for formatter
        this.getView().getModel("settings").setProperty("/search", value);
        this.getView().getModel("settings").setProperty("/tokens", valueTypes);
        const list = this.getView().byId("_IDGenList1");
        const listBinding = list.getBinding("items");
        const nameFilter = new Filter({
          path: "name",
          operator: FilterOperator.Contains,
          value1: value,
        });
        const descFilter = new Filter({
          path: "description",
          operator: FilterOperator.Contains,
          value1: value,
        });
        let typeFilters = [];
        for (let i = 0; i < valueTypes.length; i++) {
          let typeFilter = new Filter({
            path: "type",
            operator: FilterOperator.Contains,
            value1: valueTypes[i],
          });
          typeFilters.push(typeFilter);
        }
        const typeFilter = new Filter({
          filters: typeFilters,
          and: false,
        });
        const searchFilter = new Filter({
          filters: [nameFilter, descFilter],
          and: false,
        });
        if (typeFilters.length > 0) {
          listBinding.filter(
            new Filter({
              filters: [searchFilter, typeFilter],
              and: true,
            })
          );
        } else {
          listBinding.filter(searchFilter);
        }
      },
    });
  }
);
