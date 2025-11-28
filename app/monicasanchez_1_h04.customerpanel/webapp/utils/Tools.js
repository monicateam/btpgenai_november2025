sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    function (MessageToast, MessageBox, JSONModel, Fragment) {
        "use strict";

        var modelTarget = {
            core: "core",
            component: "component",
            view: "view"
        };

        return {
            // Function to retrieve the localized text from the resource bundle
            getText: function (oController, text) {
                return oController.getResourceBundle().getText(text);
            },
            getModel: function (oController, sName, mode) {
                var oModel;
                switch (mode) {
                    case modelTarget.view:
                        oModel = oController.getView().getModel(sName);
                        break;
                    case modelTarget.core:
                        oModel = oController.getCore().getModel(sName);
                        break;
                    default:
                    case modelTarget.component:
                        oModel = oController.getOwnerComponent().getModel(sName);
                        break;
                }
                return oModel;
            },

            setModel: function (oController, oModel, sName, mode) {
                switch (mode) {
                    case modelTarget.view:
                        oController.getView().setModel(oModel, sName);
                        break;
                    case modelTarget.core:
                        oController.getCore().setModel(oModel, sName);
                        break;
                    default:
                    case modelTarget.component:
                        oController.getOwnerComponent().setModel(oModel, sName);
                        break;
                }
                return oModel;
            }

        };
    });