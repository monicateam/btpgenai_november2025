sap.ui.define([
    "sap/m/MessageToast",
    'monicasanchez1h04/customerpanel/utils/Tools'
], function (MessageToast, Utils) {
    'use strict';

    return {
        /**
         * Generated event handler.
         *
         * @param oEvent the event object provided by the event provider.
         */
        onPress: function (oEvent) {
            MessageToast.show("Custom handler invoked.");
        },
        onUploadChangeTickets: function (oEvt) {
            var oController = this.editFlow.getView().getController();
            var oEditFlow = this.getEditFlow();
            var oFileUploader = oEvt.getSource();
            var filename = oEvt.getParameter("newValue");
            var currentKeyID = Utils.getModel(oController, "vista", "view").getProperty("/ticketData/ID");
            Utils.getModel(oController, "vista", "view").setProperty("/busyUploadFile", true);
            oFileUploader.removeAllHeaderParameters();
            oFileUploader.addHeaderParameter(
                new sap.ui.unified.FileUploaderParameter({
                    name: "slug",
                    value: oEvt.getParameter('files') && oEvt.getParameter('files')[0],
                })
            );
            oFileUploader.addHeaderParameter(
                new sap.ui.unified.FileUploaderParameter({
                    name: "fileName",
                    value: oEvt.getParameter('files')[0].name
                })
            );
          
            var file = oEvt.getParameter('files')[0];
            if (file && window.FileReader) {
				var reader = new FileReader();
				reader.onload = function (e) {
					let sActionName = "monicaSanchez_1_H04Srv.EntityContainer/uploadAttachmentCustomerMessage"; // Fully qualified action name
                    let mParameters = {
                        entitySetName: "CustomerMessagesAttachments",
                        model: oController.editFlow.getView().getModel(), // get the OData V4 model
                        label: "Submit",
                        parameterValues: [
                            { name: 'customerMessageID', value: Utils.getModel(oController, "vista", "view").getProperty("/ticketData/ID") },
                            { name: 'fileName', value: oEvt.getParameter('files')[0].name },
                            { name: 'content', value: e.target.result },
                            { name: 'mimeType', value: oEvt.getParameter('files')[0].type },
                            { name: 'userLanguage', value: Utils.getModel(oController, "vista", "view").getProperty("/ticketData/sourceLanguage")  }
                        ],
                        skipParameterDialog: true
                    };

                    oEditFlow.invokeAction(sActionName, mParameters)
                        .then(() => {
                            Utils.getModel(oController, "vista", "view").setProperty("/busyUploadFile", false);
                            Utils.updateAttachments(oController,Utils.getModel(oController, "vista", "view").getProperty("/ticketData/ID"));
                        }).catch((error) => {
                            Utils.getModel(oController, "vista", "view").setProperty("/busyUploadFile", false);
                        });
                 
				};
				reader.onerror = function (ex) {
                    Utils.getModel(oController, "vista", "view").setProperty("/busyUploadFile", false);
				};
			    reader.readAsDataURL(oEvt.getParameter('files') && oEvt.getParameter('files')[0]);
			}
        },
        onPressDownload: function(oEvt, oBindingContext) {
            var oController = this.editFlow.getView().getController();
            var oModel = this.editFlow.getView().getModel();
            var UUID = oEvt.getSource().data("uploadID");
            var oEditFlow = this.getEditFlow();
			var oView = oController.getView();
            var sServiceURL = oModel.sServiceUrl; 
            var sSource = sServiceURL + "/CustomerMessagesAttachments("+UUID+")/content";
			window.open(sSource);
        },
        onPressDeleteFile: function(oEvt, oBindingContext) {
            var oController = this.editFlow.getView().getController();
            var oEditFlow = this.getEditFlow();
            var UUID = oEvt.getSource().data("uploadID");

            let sActionName = "monicaSanchez_1_H04Srv.EntityContainer/deleteAttachmentCustomerMessage"; // Fully qualified action name
            let mParameters = {
                entitySetName: "CustomerMessagesAttachments",
                model: oController.editFlow.getView().getModel(), // get the OData V4 model
                label: "Submit",
                parameterValues: [
                    { name: 'customerMessageID', value: Utils.getModel(oController, "vista", "view").getProperty("/ticketData/ID") },
                    { name: 'ID', value: UUID }
                ],
                skipParameterDialog: true
            };

            oEditFlow.invokeAction(sActionName, mParameters)
                .then(() => {
                    Utils.updateAttachments(oController,Utils.getModel(oController, "vista", "view").getProperty("/ticketData/ID"));
                }).catch((error) => {

                   
                });
        }
    };
});
