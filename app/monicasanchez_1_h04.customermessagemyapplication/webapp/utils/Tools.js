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

            showDialogGenerateReplyWithoutSO: async function (oEvent, oBindingContext, oController) {
                var modelGenerateReply = {
                    busyDialogGenerateReply: false
                };
                if (!this.getModel(oController._controller, "maintainGenerateReplyDialog", "view")) {
                    this.setModel(oController._controller, new JSONModel(modelGenerateReply), "maintainGenerateReplyDialog", "view");
                } else {
                    this.getModel(oController._controller, "maintainGenerateReplyDialog", "view").setData(modelGenerateReply);
                }

                var that = this;
                var oView = oController._controller.getView();
                var oDialog = new sap.m.Dialog({
                    busyIndicatorDelay: 100,
                    title: "{i18n>generateReply}",
                    busy: "{maintainGenerateReplyDialog>/busyDialogGenerateReply}",
                    content: [
                        new sap.m.VBox({
                            items: [
                                new sap.m.Label({ text: "{i18n>noSOToGenerateReply}" })
                            ]
                        })

                    ],
                    beginButton: new sap.m.Button({
                        text: "{i18n>Submit}",
                        press: function () {
                            that.callGenerateReply(oEvent, oBindingContext, oController, true, {
                                onSuccess: function () {
                                    oDialog.close();
                                }
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
            callGenerateReply: async function (oEvent, oBindingContext, oController, busyDialog, mParams) {
                var that = this;
                if (busyDialog) {
                    this.getModel(oController._controller, "maintainGenerateReplyDialog", "view").setProperty("/busyDialogGenerateReply", true);
                }

                // Setup the parameters for invokeAction
                let sActionName = "monicaSanchez_1_H04Srv.Action1"; // Fully qualified action name
                let mParameters = {
                    entitySetName: "CustomerMessage",
                    model: oController.editFlow.getView().getModel(), // get the OData V4 model
                    contexts: oBindingContext, // for unbound actions, pass empty array
                    label: "Submit",
                    skipParameterDialog: true
                };

                // Use the Fiori Elements Edit Flow API
                oController.editFlow.invokeAction(sActionName, mParameters)
                    .then(() => {
                        if (busyDialog) {
                            that.getModel(oController._controller, "maintainGenerateReplyDialog", "view").setProperty("/busyDialogGenerateReply", false);
                        }
                        sap.m.MessageToast.show(that.getText(oController._controller, "ReplyGenerated"));
                        if (!!mParams && !!mParams.onSuccess) {
                            mParams.onSuccess();
                        }
                    }).catch((error) => {
                        if (busyDialog) {
                            that.getModel(oController._controller, "maintainGenerateReplyDialog", "view").setProperty("/busyDialogGenerateReply", false);
                        }
                        sap.m.MessageToast.show(that.getText(oController._controller, "ErrorReplyGeneration"));
                        console.error(error);
                        if (!!mParams && !!mParams.onError) {
                            mParams.onError(error);
                        }
                    });
            },
            showYesOrNoMessage: function (oController, tituloDialog, textoDialog, mParams) {
                var btnSI = oController.getResourceBundle().getText("Yes");
                var btnNo = oController.getResourceBundle().getText("No");

                var dialog = new sap.m.Dialog({
                    title: this.getText(oController, tituloDialog),
                    type: 'Message',
                    content: new sap.m.Text({
                        text: this.getText(oController, textoDialog)
                    }),
                    beginButton: new sap.m.Button({
                        text: btnSI,
                        press: function () {
                            dialog.close();
                            dialog.destroy();
                            if (!!mParams && !!mParams.yes) {
                                mParams.yes();
                            }
                        }
                    }),
                    endButton: new sap.m.Button({
                        text: btnNo,
                        press: function () {
                            dialog.close();
                            dialog.destroy();
                            if (!!mParams && !!mParams.no) {
                                mParams.no();
                            }
                        }
                    }),
                    afterClose: function () {
                        dialog.close();
                        dialog.destroy();
                    }
                });
                dialog.open();
            },
            crearDialogSimple: function (oController, title, text, btntext) {
				var dialog = new sap.m.Dialog({
					title: this.getText(oController, title) ,
					type: 'Message',
                    content: new sap.m.Text({
						text: this.getText(oController, text) ,
					}),
					beginButton: new sap.m.Button({
						text: this.getText(oController, btntext),
						press: function () {
							dialog.close();
							dialog.destroy();
						}
					}),
					afterClose: function () {
						dialog.close();
						dialog.destroy();
					}
				});
				dialog.open();
			},
            showDialogMaintainSO: async function (oEvent, oBindingContext, oController) {
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
                if (!this.getModel(oController._controller, "maintainSODialog", "view")) {
                    this.setModel(oController._controller, new JSONModel(maintainSODialog), "maintainSODialog", "view");
                } else {
                    this.getModel(oController._controller, "maintainSODialog", "view").setData(maintainSODialog);
                }
                var that = this;
                var oView = oController._controller.getView();
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
                            that.getModel(oController._controller, "maintainSODialog", "view").setProperty("/busyDialogMaintainSO", true);
                            var serviceOrderData = {
                                ServiceOrderNumber: "",
                                ServiceOrderDurationProduct: that.getModel(oController._controller, "maintainSODialog", "view").getProperty("/serviceOrderProduct"),
                                ServiceOrderDuration: parseInt(that.getModel(oController._controller, "maintainSODialog", "view").getProperty("/ServiceOrderDuration")),
                                ServiceOrderDurationUnit: that.getModel(oController._controller, "maintainSODialog", "view").getProperty("/ServiceOrderDurationUnit"),
                                ServiceOrderDurationDescription: that.getModel(oController._controller, "maintainSODialog", "view").getProperty("/ServiceOrderItemDurationDescription"),
                                ServiceOrderQuantityProduct: that.getModel(oController._controller, "maintainSODialog", "view").getProperty("/serviceQtyProduct"),
                                ServiceOrderQuantity: parseInt(that.getModel(oController._controller, "maintainSODialog", "view").getProperty("/ServiceQuantity")),
                                ServiceOrderQuantityUnit: that.getModel(oController._controller, "maintainSODialog", "view").getProperty("/ServiceQtyUnit"),
                                SerrviceOrderQuantityDescription: that.getModel(oController._controller, "maintainSODialog", "view").getProperty("/ServiceOrderItemQtyDescription"),
                                ServiceOrderLanguage: that.getModel(oController._controller, "maintainSODialog", "view").getProperty("/serviceOrderLanguage"),
                                PersonResponsible: that.getModel(oController._controller, "maintainSODialog", "view").getProperty("/ServiceOrderDurationUnit"),
                                ServiceOrderType: that.getModel(oController._controller, "maintainSODialog", "view").getProperty("/serviceOrderType"),
                                ServiceOrderDocumentPriority: that.getModel(oController._controller, "maintainSODialog", "view").getProperty("/serviceOrderDocPriority"),
                                ServiceOrderSalesOrganization: that.getModel(oController._controller, "maintainSODialog", "view").getProperty("/ServiceOrderSalesOrganization"),
                                serviceOrderDistributionChannel: that.getModel(oController._controller, "maintainSODialog", "view").getProperty("/ServiceOrderDistributionChannel"),
                                ServiceOrderDivision: that.getModel(oController._controller, "maintainSODialog", "view").getProperty("/ServiceOrderDivision"),
                                ServiceOrderSoldToParty: that.getModel(oController._controller, "maintainSODialog", "view").getProperty("/ServiceOrderSoldToParty")
                            }

                            // Setup the parameters for invokeAction
                            let sActionName = "monicaSanchez_1_H04Srv.Action2"; // Fully qualified action name
                            let mParameters = {
                                entitySetName: "CustomerMessage",
                                // var oModel = var.getExtensionAPI().getModel();
                                model: oController.editFlow.getView().getModel(), // get the OData V4 model
                                contexts: oBindingContext, // for unbound actions, pass empty array
                                label: "Submit",
                                parameterValues: [
                                    { name: 'ServiceOrderDetail', value: serviceOrderData }
                                ],
                                skipParameterDialog: true
                            };

                            // Use the Fiori Elements Edit Flow API
                            oController.editFlow.invokeAction(sActionName, mParameters)
                                .then(() => {
                                    that.getModel(oController._controller, "maintainSODialog", "view").setProperty("/busyDialogMaintainSO", false);
                                    sap.m.MessageToast.show(that.getText(oController._controller, "ServiceOrderCreated"));
                                    oDialog.close();
                                }).catch((error) => {
                                    that.getModel(oController._controller, "maintainSODialog", "view").setProperty("/busyDialogMaintainSO", false);
                                    sap.m.MessageToast.show(that.getText(oController._controller, "ErrorCreationServiceOrder"));
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