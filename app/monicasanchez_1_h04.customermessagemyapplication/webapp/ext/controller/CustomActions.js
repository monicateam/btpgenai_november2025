sap.ui.define([
    "sap/m/MessageBox",
    "sap/ui/core/library",
    "sap/ui/model/json/JSONModel",
    "monicasanchez1h04/customermessagemyapplication/utils/Tools",
], function (MessageBox, coreLibrary, JSONModel, Utils) {
    "use strict";
    return {

        MaintainSOExtended: async function (oEvent, oBindingContext) {
            var maintainSODialog = {
                serviceOrderProduct: "SRV_01",
                ServiceOrderDuration: 1,
                ServiceOrderDurationUnit: "HR",
                ServiceOrderItemDurationDescription: "Service Order duration",
                serviceQtyProduct: "SRV_02",
                ServiceQuantity: 1,
                ServiceQtyUnit: "EA",
                ServiceOrderItemQtyDescription: "Service Order quantity",
                serviceOrderLanguage: "EN",
                serviceOrderType: "SVO1",
                serviceOrderDocPriority: "5",
                ServiceOrderSalesOrganization: "1710",
                ServiceOrderDistributionChannel: "10",
                ServiceOrderDivision: "00",
                ServiceOrderSoldToParty: "17100002",
                ServiceOrderPersonResponsible: "9980003640",
                busyDialogMaintainSO: false

            };
            if (!Utils.getModel(this._controller, "maintainSODialog", "view")) {
                Utils.setModel(this._controller, new JSONModel(maintainSODialog), "maintainSODialog", "view");
            } else {
                Utils.getModel(this._controller, "maintainSODialog", "view").setData(maintainSODialog);
            }
            var that = this;
            var oView = this._controller.getView();
            var oDialog = new sap.m.Dialog({
                busyIndicatorDelay: 100,
                title: "{i18n>maintainServiceOrder}",
                busy: "{maintainSODialog>/busyDialogMaintainSO}",
                content: [
                    new sap.m.VBox({
                        items: [
                            new sap.m.Title({ text: "{i18n>serviceOrderHeader}" }),
                            new sap.m.Label({ text: "{i18n>Type}", labelFor: "serviceOrderType", }),
                            new sap.m.Input("serviceOrderType", {
                                value: "{maintainSODialog>/serviceOrderType}"
                            }),
                            new sap.m.Label({ text: "{i18n>Language}", labelFor: "serviceOrderLanguage", }),
                            new sap.m.Input("serviceOrderLanguage", {
                                value: "{maintainSODialog>/serviceOrderLanguage}"
                            }),
                            new sap.m.Label({ text: "{i18n>PersonResponsible}", labelFor: "ServiceOrderPersonResponsible", }),
                            new sap.m.Input("ServiceOrderPersonResponsible", {
                                value: "{maintainSODialog>/ServiceOrderPersonResponsible}"
                            }),
                            new sap.m.Label({ text: "{i18n>DocumentPriority}", labelFor: "serviceOrderDocPriority" }),
                            new sap.m.Input("serviceOrderDocPriority", {
                                value: "{maintainSODialog>/serviceOrderDocPriority}"
                            }),
                            new sap.m.Label({ text: "{i18n>SalesOrganization}", labelFor: "ServiceOrderSalesOrganization" }),
                            new sap.m.Input("ServiceOrderSalesOrganization", {
                                value: "{maintainSODialog>/ServiceOrderSalesOrganization}"
                            }),
                            new sap.m.Label({ text: "{i18n>DistributionChannel}", labelFor: "ServiceOrderDistributionChannel" }),
                            new sap.m.Input("ServiceOrderDistributionChannel", {
                                value: "{maintainSODialog>/ServiceOrderDistributionChannel}"
                            }),
                            new sap.m.Label({ text: "{i18n>Division}", labelFor: "ServiceOrderDivision" }),
                            new sap.m.Input("ServiceOrderDivision", {
                                value: "{maintainSODialog>/ServiceOrderDivision}"
                            }),
                            new sap.m.Label({ text: "{i18n>SoldToParty}", labelFor: "ServiceOrderSoldToParty" }),
                            new sap.m.Input("ServiceOrderSoldToParty", {
                                value: "{maintainSODialog>/ServiceOrderSoldToParty}"
                            })
                        ]
                    }),
                    new sap.m.VBox({
                        items: [
                            new sap.m.Title({ text: "{i18n>serviceOrderDuration}" }),
                            new sap.m.Label({ text: "{i18n>Product}", labelFor: "serviceOrderProduct", }),
                            new sap.m.Input("serviceOrderProduct", {
                                value: "{maintainSODialog>/serviceOrderProduct}"
                            }),
                            new sap.m.Label({ text: "{i18n>Duration}", labelFor: "serviceOrderDuration" }),
                            new sap.m.Input("serviceOrderDuration", {
                                value: "{maintainSODialog>/ServiceOrderDuration}"
                            }),
                            new sap.m.Label({ text: "{i18n>Unit}", labelFor: "ServiceOrderDurationUnit" }),
                            new sap.m.Input("ServiceOrderDurationUnit", {
                                value: "{maintainSODialog>/ServiceOrderDurationUnit}"
                            }),
                            new sap.m.Label({ text: "{i18n>Description}", labelFor: "ServiceOrderItemDescription" }),
                            new sap.m.Input("ServiceOrderItemDescription", {
                                value: "{maintainSODialog>/ServiceOrderItemDurationDescription}"
                            })
                        ]
                    }),
                    new sap.m.VBox({
                        items: [
                            new sap.m.Title({ text: "{i18n>serviceOrderQuantity}" }),
                            new sap.m.Label({ text: "{i18n>Product}", labelFor: "serviceOrderQtyProduct", }),
                            new sap.m.Input("serviceOrderQtyProduct", {
                                value: "{maintainSODialog>/serviceQtyProduct}"
                            }),
                            new sap.m.Label({ text: "{i18n>Quantity}", labelFor: "serviceOrderQuantity" }),
                            new sap.m.Input("serviceOrderQuantity", {
                                value: "{maintainSODialog>/ServiceQuantity}"
                            }),
                            new sap.m.Label({ text: "{i18n>Unit}", labelFor: "ServiceOrderQtyUnit" }),
                            new sap.m.Input("ServiceOrderQtyUnit", {
                                value: "{maintainSODialog>/ServiceQtyUnit}"
                            }),
                            new sap.m.Label({ text: "{i18n>Description}", labelFor: "ServiceOrderItemQtyDescription" }),
                            new sap.m.Input("ServiceOrderItemQtyDescription", {
                                value: "{maintainSODialog>/ServiceOrderItemQtyDescription}"
                            })
                        ]
                    })

                ],
                beginButton: new sap.m.Button({
                    text: "{i18n>Submit}",
                    press: function () {
                        Utils.getModel(that._controller, "maintainSODialog", "view").setProperty("/busyDialogMaintainSO", true);
                        var serviceOrderData = {
                            ServiceOrderNumber: "",
                            ServiceOrderDurationProduct: Utils.getModel(that._controller, "maintainSODialog", "view").getProperty("/serviceOrderProduct"),
                            ServiceOrderDuration: parseInt(Utils.getModel(that._controller, "maintainSODialog", "view").getProperty("/ServiceOrderDuration")),
                            ServiceOrderDurationUnit: Utils.getModel(that._controller, "maintainSODialog", "view").getProperty("/ServiceOrderDurationUnit"),
                            ServiceOrderDurationDescription: Utils.getModel(that._controller, "maintainSODialog", "view").getProperty("/ServiceOrderItemDurationDescription"),
                            ServiceOrderQuantityProduct: Utils.getModel(that._controller, "maintainSODialog", "view").getProperty("/serviceQtyProduct"),
                            ServiceOrderQuantity: parseInt(Utils.getModel(that._controller, "maintainSODialog", "view").getProperty("/ServiceQuantity")),
                            ServiceOrderQuantityUnit: Utils.getModel(that._controller, "maintainSODialog", "view").getProperty("/ServiceQtyUnit"),
                            SerrviceOrderQuantityDescription: Utils.getModel(that._controller, "maintainSODialog", "view").getProperty("/ServiceOrderItemQtyDescription"),
                            ServiceOrderLanguage: Utils.getModel(that._controller, "maintainSODialog", "view").getProperty("/serviceOrderLanguage"),
                            PersonResponsible: Utils.getModel(that._controller, "maintainSODialog", "view").getProperty("/ServiceOrderDurationUnit"),
                            ServiceOrderType: Utils.getModel(that._controller, "maintainSODialog", "view").getProperty("/serviceOrderType"),
                            ServiceOrderDocumentPriority: Utils.getModel(that._controller, "maintainSODialog", "view").getProperty("/serviceOrderDocPriority"),
                            ServiceOrderSalesOrganization: Utils.getModel(that._controller, "maintainSODialog", "view").getProperty("/ServiceOrderSalesOrganization"),
                            serviceOrderDistributionChannel: Utils.getModel(that._controller, "maintainSODialog", "view").getProperty("/ServiceOrderDistributionChannel"),
                            ServiceOrderDivision: Utils.getModel(that._controller, "maintainSODialog", "view").getProperty("/ServiceOrderDivision"),
                            ServiceOrderSoldToParty: Utils.getModel(that._controller, "maintainSODialog", "view").getProperty("/ServiceOrderSoldToParty")
                        }

                        // Setup the parameters for invokeAction
                        let sActionName = "monicaSanchez_1_H04Srv.Action2"; // Fully qualified action name
                        let mParameters = {
                            entitySetName: "CustomerMessage",
                            // var oModel = var.getExtensionAPI().getModel();
                            model: that.editFlow.getView().getModel(), // get the OData V4 model
                            contexts: oBindingContext, // for unbound actions, pass empty array
                            label: "Submit",
                            parameterValues: [
                                { name: 'ServiceOrderDetail', value: serviceOrderData }
                            ],
                            skipParameterDialog: true
                        };

                        // Use the Fiori Elements Edit Flow API
                        that.editFlow.invokeAction(sActionName, mParameters)
                            .then(() => {
                                Utils.getModel(that._controller, "maintainSODialog", "view").setProperty("/busyDialogMaintainSO", false);
                                sap.m.MessageToast.show(Utils.getText(that._controller, "ServiceOrderCreated"));
                                oDialog.close();
                            }).catch((error) => {
                                Utils.getModel(that._controller, "maintainSODialog", "view").setProperty("/busyDialogMaintainSO", false);
                                sap.m.MessageToast.show(Utils.getText(that._controller, "ErrorCreationServiceOrder"));
                                console.error(error);
                            });
                    }
                }),
                endButton: new sap.m.Button({
                    text: "{i18n>Cancel}",
                    press: function () {
                        oDialog.close();
                    }

                }),
                afterClose: function () {
                    oDialog.destroy();
                }
            });
            oView.addDependent(oDialog);
            oDialog.addStyleClass("sapUiResponsiveContentPadding");
            oDialog.open();
        },
        generateReplyExtended: async function (oEvent, oBindingContext) {
                var that = this;
                var oView = this._controller.getView();
                var oContextBinding = oView.getModel().bindContext(oBindingContext[0].sPath);
                oContextBinding.requestObject().then((oData) => {
                    console.log(oData);

                    if(oData.suggestedResponseEnglish.length === 0) {
                        if (oData.S4HCP_ServiceOrder_ServiceOrder !== null && oData.S4HCP_ServiceOrder_ServiceOrder !== undefined) {
                            Utils.callGenerateReply(oEvent, oBindingContext, that, false);
                        } else {
                            Utils.showDialogGenerateReplyWithoutSO(oEvent, oBindingContext, that);
                        }
                    } else {
                        Utils.showYesOrNoMessage(that._controller, "alreadyGeneratedReply", "ReplyAlreadyExists", {
                            yes: function() {
                                if (oData.S4HCP_ServiceOrder_ServiceOrder !== null && oData.S4HCP_ServiceOrder_ServiceOrder !== undefined) {
                                    Utils.callGenerateReply(oEvent, oBindingContext, that, false);
                                } else {
                                    Utils.showDialogGenerateReplyWithoutSO(oEvent, oBindingContext, that);
                                }
                            },
                            no: function() {

                            }
                        });
                    }

                    
                    //Handle success
                }).catch((err) => {
                    //Handle error
                });
            },

    };
});