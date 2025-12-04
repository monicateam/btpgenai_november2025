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
			//var currentCustomerId = that.getView().byId("monicasanchez1h04.customerpanel::customerTicketsList--fe::FilterBar::customerTickets::CustomFilterField::customerId--customerID").getValue();

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
						console.log(responseOdata);
						//Add the data of the current user system (hardcoded now, option will be to be loaded called on the ERP system of the logon data or other service)
						//var oBindingParams = oEvent.getParameters("bindingParams");
						var statFilter = new sap.ui.model.Filter("customerId", "EQ", responseOdata.id);
						that.getView().byId("monicasanchez1h04.customerpanel::customerTicketsList--fe::FilterBar::customerTickets::CustomFilterField::customerId--customerID").setValue(responseOdata.id);
						Utils.getModel(oController, "vista", "view").setProperty("/customer_id",responseOdata.id);
						that.getView().byId("monicasanchez1h04.customerpanel::customerTicketsList--fe::FilterBar::customerTickets").triggerSearch();
						/*
						if(oBindingParams.collectionBindingInfo.collectionBindingInfo.filters === undefined) {
							oBindingParams.collectionBindingInfo.collectionBindingInfo.filters = [];
						}

						if(oBindingParams.collectionBindingInfo.collectionBindingInfo.filters.aFilters !== undefined) {
							oBindingParams.collectionBindingInfo.collectionBindingInfo.filters.aFilters.push(statFilter);
						} else {
							oBindingParams.collectionBindingInfo.collectionBindingInfo.filters.push(statFilter);
						}
						oEvent.getSource().invalidate();
						oEvent.getSource().refresh();
						console.log(oEvent.getSource().getSelectedContexts());*/
					}).catch((error) => {
					
					});
			} else {
				that.getView().byId("monicasanchez1h04.customerpanel::customerTicketsList--fe::FilterBar::customerTickets::CustomFilterField::customerId--customerID").setValue(Utils.getModel(oController, "vista", "view").getProperty("/customer_id"));
			/*	var oBindingParams = oEvent.getParameters("bindingParams");
				var statFilter = new sap.ui.model.Filter("customerId", "EQ", Utils.getModel(oController, "vista", "view").getProperty("/customer_id"));
				if(oBindingParams.collectionBindingInfo.collectionBindingInfo.filters === undefined) {
					oBindingParams.collectionBindingInfo.collectionBindingInfo.filters = [];
				}

				if(oBindingParams.collectionBindingInfo.collectionBindingInfo.filters.aFilters !== undefined) {
					oBindingParams.collectionBindingInfo.collectionBindingInfo.filters.aFilters.push(statFilter);
				} else {
					oBindingParams.collectionBindingInfo.collectionBindingInfo.filters.push(statFilter);
				}*/
			}			
		
		}
	});
});
