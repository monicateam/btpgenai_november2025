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
           /* oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
                name: 'attachmentName',
                value: filename
            }));*/
            /*oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
                name: 'customerMessageKey',
                value: currentKeyID
            }));*/
            oFileUploader.addHeaderParameter(
                new sap.ui.unified.FileUploaderParameter({
                    name: "slug",
                    value: oEvt.getSource().getValue(),
                })
            );
            oFileUploader.addHeaderParameter(
                new sap.ui.unified.FileUploaderParameter({
                    name: "fileName",
                    value: oEvt.getParameter('files')[0].name
                })
            );
            /*oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
                name: 'Content-Type',
                value: oEvt.getParameter('files')[0].type
            }));*/
            console.log("test");
            var file = oEvt.getParameter('files') && oEvt.getParameter('files')[0];
            if (file && window.FileReader) {
				var reader = new FileReader();
				reader.onload = function (e) {
					var data = e.target.result;
					let sActionName = "monicaSanchez_1_H04Srv.EntityContainer/uploadAttachmentCustomerMessage"; // Fully qualified action name
                    let mParameters = {
                        entitySetName: "CustomerMessagesAttachments",
                        model: oController.editFlow.getView().getModel(), // get the OData V4 model
                       // contexts: actionBinding, // for unbound actions, pass empty array
                        label: "Submit",
                        parameterValues: [
                            { name: 'customerMessageID', value: Utils.getModel(oController, "vista", "view").getProperty("/ticketData/ID") },
                            { name: 'fileName', value: oEvt.getParameter('files')[0].name },
                            { name: 'content', value: data },
                            { name: 'mimeType', value: oEvt.getParameter('files')[0].type }
                        ],
                        skipParameterDialog: true
                    };

                    // Use the Fiori Elements Edit Flow API
                    /*oController.editFlow.invokeAction(sActionName, mParameters)
                        .then(() => {
                            console.log("OK");
                            Utils.getModel(oController, "vista", "view").setProperty("/busyUploadFile", false);
                        }).catch((error) => {
                            console.log(error);
                            Utils.getModel(oController, "vista", "view").setProperty("/busyUploadFile", false);
                        });*/
                    oEditFlow.invokeAction(sActionName, mParameters)
                        .then(() => {
                            console.log("OK");
                            Utils.getModel(oController, "vista", "view").setProperty("/busyUploadFile", false);
                        }).catch((error) => {
                            console.log(error);
                            Utils.getModel(oController, "vista", "view").setProperty("/busyUploadFile", false);
                        });
                    oFileUploader.clear();  
				};
				reader.onerror = function (ex) {
                    console.log(ex);
                    Utils.getModel(oController, "vista", "view").setProperty("/busyUploadFile", false);
				};
				reader.readAsBinaryString(file);
			}
           //oFileUploader.setSendXHR(true);
        },
        onUploadCompleteTickets: function (oEvt) {
            var oController = this.editFlow.getView().getController();
            Utils.getModel(oController, "vista", "view").setProperty("/busyUploadFile", false);
            var fileUploader = oEvt.getSource();
            fileUploader.clear();

            //Quitar parametros de cabecera y volverlos a insertar
            fileUploader.removeAllHeaderParameters();

            //Load logs
            var responseUpload = oEvt.getParameter("responseRaw");
            var respuesta = /<message>(.*?)<\/message>/g.exec(responseUpload);
            console.log(respuesta);
            try {

            } catch (error) {

            }
            if (oEvt.getParameter("status") === 200) {


            } else {
                if (respuesta !== null) {
                    //var arrayErrores = Util.stringToArrayErrorLog(responseUpload);

                }
                else {

                }
            }
        }
    };
});
