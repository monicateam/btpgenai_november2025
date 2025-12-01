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
            },
            updateAttachments: function(oController, customerMessageKey) {
                var oView = oController.getView();
                var aFilters = [
                    new sap.ui.model.Filter("customerMessageKey", sap.ui.model.FilterOperator.EQ, customerMessageKey),
                    new sap.ui.model.Filter("deleted", sap.ui.model.FilterOperator.NE, true)
                ];
                var oListBinding = oView.getModel().bindList(
                    "/CustomerMessagesAttachments",                              //sPath
                    null,                                       //oContext
                    null,                                       //vSorters - Dynamic Sorters 
                    aFilters
                );
                oListBinding.requestContexts().then((oListContext) => {
                    var oData = oListContext.map(rowContext => rowContext.getObject());	
                    //Handle success
                    this.getModel(oController, "vista", "view").setProperty("/attachments",oData);
                })
                .catch((err) => {
                    //Handle error
                });
            }

        };
    });