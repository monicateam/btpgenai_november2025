sap.ui.define(["sap/ui/model/Filter", "sap/ui/model/FilterOperator"], function (Filter, FilterOperator) {
    "use strict";
    return {
        onValueChanged: function (oEvent) {
            this.setFilterValues("customerId", oEvent.getParameter("value"));
        }
    };
});