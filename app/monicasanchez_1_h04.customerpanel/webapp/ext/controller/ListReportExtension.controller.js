sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('monicasanchez1h04.customerpanel.ext.controller.ListReportExtension', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf monicasanchez1h04.customerpanel.ext.controller.ListReportExtension
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				this.oSmartTable = this.getView().byId("monicasanchez1h04.customerpanel::customerTicketsList--fe::table::customerTickets::LineItem").getParent();
			},
			routing: {
				onBeforeBinding: async function (oBindingContext) {
					this.oSmartTable.attachBeforeRebindTable(this._onBeforeRebindTable, this);
				},
			},
			onAfterRendering: function (oEvt) {
 
			}
			
		},
		_onBeforeRebindTable: function (oEvent) {
			//Add the data of the current user system (hardcoded now, option will be to be loaded called on the ERP system of the logon data or other service)
			var oBindingParams = oEvent.getParameters("bindingParams");
  			var statFilter = new sap.ui.model.Filter("customerId", "EQ", "C004");
  			if(oBindingParams.collectionBindingInfo.collectionBindingInfo.filters === undefined) {
				oBindingParams.collectionBindingInfo.collectionBindingInfo.filters = [];
			}

			if(oBindingParams.collectionBindingInfo.collectionBindingInfo.filters.aFilters !== undefined) {
				oBindingParams.collectionBindingInfo.collectionBindingInfo.filters.aFilters.push(statFilter);
			} else {
				oBindingParams.collectionBindingInfo.collectionBindingInfo.filters.push(statFilter);
			}
		
		}
	});
});
