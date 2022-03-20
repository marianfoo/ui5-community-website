sap.ui.define(
  ["./BaseController", "com/sap/ui5community/model/formatter", "sap/ui/core/routing/History"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, formatter, History) {
    "use strict";

    return Controller.extend("com.sap.ui5community.controller.ObjectView", {
      onInit: function () {
        this.getRouter().getRoute("RouteObjectView").attachPatternMatched(this.onPatternMatched, this);
      },
      onPatternMatched: function (oEvent) {
        const objectName = oEvent.getParameter("arguments").name;
        let model = this.getModel("packages");
        let data = model.getData();
        // find object index in data
        let objectIndex = data.findIndex((object) => object.name === objectName);
        if (!objectIndex) {
          //object not found
          // return
        }
        this.getView().bindElement({
          path: `/${objectIndex}`,
          model: "packages",
        });
      },

      /**
       * Event handler  for navigating back.
       * It there is a history entry we go one step back in the browser history
       * If not, it will replace the current entry of the browser history with the worklist route.
       * @public
       */
      onNavBack: function () {
        var sPreviousHash = History.getInstance().getPreviousHash();

        if (sPreviousHash !== undefined) {
          history.go(-1);
        } else {
          this.getRouter().navTo("RouteMainView", {}, true);
        }
      },
    });
  }
);
