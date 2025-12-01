sap.ui.define([
	'sap/ui/core/mvc/ControllerExtension',
	'monicasanchez1h04/customermessagemyapplication/utils/Tools',
	"sap/ui/model/json/JSONModel"
], function (ControllerExtension, Utils,JSONModel) {
	'use strict';

	return ControllerExtension.extend('monicasanchez1h04.customermessagemyapplication.ext.controller.CustomerMessage-extensionObjectPage', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf monicasanchez1h04.customermessagemyapplication.ext.controller.CustomerMessage-extensionObjectPage
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			
		}
	});
});
