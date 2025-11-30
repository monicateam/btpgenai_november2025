sap.ui.define([
	'sap/ui/core/mvc/ControllerExtension',
	'monicasanchez1h04/customerpanel/utils/Tools',
	"sap/ui/model/json/JSONModel"
	], function (ControllerExtension, Utils,JSONModel) {
	'use strict';

	return ControllerExtension.extend('monicasanchez1h04.customerpanel.ext.controller.CustomerTicketsObjectExtension', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf monicasanchez1h04.customerpanel.ext.controller.CustomerTicketsObjectExtension
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				
			},
			routing: {
				onAfterBinding: async function (oBindingContext) {
					var that = this;
					var oController = this.base;
					var oView = oController.getView();
					console.log(oView.getModel().sServiceUrl);
					var modelViewEtension = {
						attachments: [],
						busyUploadFile: false,
						busyTableAttachments: false,
						ticketData: {},
						urlUploadAttachments: oView.getModel().sServiceUrl+"CustomerMessagesAttachments"

					};
					if (!Utils.getModel(oController, "vista", "view")) {
						Utils.setModel(oController, new JSONModel(modelViewEtension), "vista", "view");
					} else {
						Utils.getModel(oController, "vista", "view").setData(modelViewEtension);
					}

					

					
					var oContextBinding = oView.getModel().bindContext(oBindingContext.sPath);
					oContextBinding.requestObject().then((oData) => {
						Utils.getModel(oController, "vista", "view").setProperty("/ticketData",oData);
						console.log(Utils.getModel(oController, "vista", "view").getProperty("/ticketData"));


						var aFilters = [
							new sap.ui.model.Filter("customerMessageKey", sap.ui.model.FilterOperator.EQ, oData.ID),
							new sap.ui.model.Filter("deleted", sap.ui.model.FilterOperator.NE, true)
						];
						var oListBinding = oView.getModel().bindList(
							"/CustomerMessagesAttachments",                              //sPath
							null,                                       //oContext
							null,                                       //vSorters - Dynamic Sorters 
							aFilters
						);
						oListBinding.requestContexts().then((oListContext) => {
							oData = oListContext.map(rowContext => rowContext.getObject());	
							//Handle success
							console.log(oData);
							Utils.getModel(oController, "vista", "view").setProperty("/attachments",oData);
						})
						.catch((err) => {
							//Handle error
						});
					}).catch((err) => {
						//Handle error
					});
				} 
    		},
			onAfterRendering: function (oEvt) {
				
			}
		},
		
	});
});
