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
            }

        };
    });