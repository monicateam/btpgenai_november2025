sap.ui.define([
	'sap/ui/core/mvc/ControllerExtension',
	'monicasanchez1h04/customerpanel/utils/Tools',
	"sap/ui/model/json/JSONModel"
	], function (ControllerExtension, Utils,JSONModel) {
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

				var oController = this.base;
				var modelViewEtension = {
					customer_id: ""

				};
				if (!Utils.getModel(oController, "vista", "view")) {
					Utils.setModel(oController, new JSONModel(modelViewEtension), "vista", "view");
				} else {
					Utils.getModel(oController, "vista", "view").setData(modelViewEtension);
				}
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
			var that = this;
			var oController = this.base.getView().getController();
			var oModel = this.base.getExtensionAPI().getModel();
			var currentCustomerId = Utils.getModel(oController, "vista", "view").getProperty("/customer_id");
			
			if(currentCustomerId === undefined || currentCustomerId.length === 0) {
				let sActionName = "monicaSanchez_1_H04Srv.EntityContainer/userInfo"; // Fully qualified action name
				let mParameters = {
					model: oController.editFlow.getView().getModel(), // get the OData V4 model
					label: "Submit",
					skipParameterDialog: true
				};

				oController.editFlow.invokeAction(sActionName, mParameters)
					.then((oData) => {
						var responseOdata = oData?.getObject();
						if(responseOdata.id !== "*") {
							that.getView().byId("monicasanchez1h04.customerpanel::customerTicketsList--fe::FilterBar::customerTickets::CustomFilterField::customerId--customerID").setValue(responseOdata.id);
						}
						Utils.getModel(oController, "vista", "view").setProperty("/customer_id",responseOdata.id);
						that.getView().byId("monicasanchez1h04.customerpanel::customerTicketsList--fe::FilterBar::customerTickets").triggerSearch();
					}).catch((error) => {
					
					});
			} else {
				if(Utils.getModel(oController, "vista", "view").getProperty("/customer_id") !== "*") {
					that.getView().byId("monicasanchez1h04.customerpanel::customerTicketsList--fe::FilterBar::customerTickets::CustomFilterField::customerId--customerID").setValue(Utils.getModel(oController, "vista", "view").getProperty("/customer_id"));
				}
				
			}			
		
		}
	});
});
