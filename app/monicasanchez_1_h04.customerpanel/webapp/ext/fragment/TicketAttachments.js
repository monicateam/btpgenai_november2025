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
                console.log("subiendo");
				reader.onload = function (e) {
                    console.log(e.target.result);
                  //  var string = this.resultString != null ? this.resultString : this.result;

                   // const array = Uint16Array.from(new Uint8Array(buffer));
                  //  const binaryString = new TextDecoder("UTF-16").decode(array);

                 //   var contentBase64 = btoa(String.fromCharCode.apply(null, new Uint8Array(string)));
				//	var data = string;
                  //  var blob = new Blob([e.target.result], {type: oEvt.getParameter('files')[0].type});
                //    var objectUrl = URL.createObjectURL(blob);
                //    window.open(objectUrl);
					let sActionName = "monicaSanchez_1_H04Srv.EntityContainer/uploadAttachmentCustomerMessage"; // Fully qualified action name
                    let mParameters = {
                        entitySetName: "CustomerMessagesAttachments",
                        model: oController.editFlow.getView().getModel(), // get the OData V4 model
                        label: "Submit",
                        parameterValues: [
                            { name: 'customerMessageID', value: Utils.getModel(oController, "vista", "view").getProperty("/ticketData/ID") },
                            { name: 'fileName', value: oEvt.getParameter('files')[0].name },
                            { name: 'content', value: e.target.result },
                            { name: 'mimeType', value: oEvt.getParameter('files')[0].type }
                        ],
                        skipParameterDialog: true
                    };

                    oEditFlow.invokeAction(sActionName, mParameters)
                        .then(() => {
                            Utils.getModel(oController, "vista", "view").setProperty("/busyUploadFile", false);
                        }).catch((error) => {
                            Utils.getModel(oController, "vista", "view").setProperty("/busyUploadFile", false);
                        });
                 
				};
				reader.onerror = function (ex) {
                    Utils.getModel(oController, "vista", "view").setProperty("/busyUploadFile", false);
				};
			    reader.readAsDataURL(oEvt.getParameter('files') && oEvt.getParameter('files')[0]);
                //reader.readAsBinaryString(oEvt.getParameter('files') && oEvt.getParameter('files')[0]);
			}
        },
        onUploadCompleteTickets: function (oEvt) {
            var oController = this.editFlow.getView().getController();
            Utils.getModel(oController, "vista", "view").setProperty("/busyUploadFile", false);
            var fileUploader = oEvt.getSource();
            fileUploader.clear();
            fileUploader.removeAllHeaderParameters();
            if (oEvt.getParameter("status") === 200) {


            } else {
                
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
            /*var oContextBinding = oView.getModel().bindContext("/CustomerMessagesAttachments("+UUID+")/$value");
            oContextBinding.requestObject().then((oData) => {
                console.log(oData);
                let response = oContextBinding.getBoundContext().getObject();
                let data_uri_string = response.value;
                let link = document.createElement('a');
                link.href = data_uri_string;
                link.download = `${file_name}.pdf`;
                link.click();
            }).catch((err) => {
                //Handle error
            });*/
/*
            console.log("OK");
           let sActionName = "monicaSanchez_1_H04Srv.EntityContainer/downloadAttachmentCustomerMessage"; // Fully qualified action name
            let mParameters = {
                entitySetName: "CustomerMessagesAttachments",
                model: oController.editFlow.getView().getModel(), // get the OData V4 model
                label: "Submit",
                parameterValues: [
                    { name: 'customerMessageID', value: Utils.getModel(oController, "vista", "view").getProperty("/ticketData/ID") },
                    { name: 'ID', value: UUID },
                ],
                skipParameterDialog: true
            };

            oEditFlow.invokeAction(sActionName, mParameters)
                .then((result) => {
                    const response = result?.getObject()
                    let data_uri_string = response.value;
                    let link = document.createElement('a');
                    link.href = data_uri_string;
                    console.log(link.href);
                    link.download = '${file_name}.png';
                    link.click();
                }).catch((error) => {
                    console.log(error);
                });*/

          /*  let sPath ="/downloadAttachmentCustomerMessage(…)";
            let oBindingContext = oModel.createBindingContext("/");
            let oOperation = oModel.bindContext(sPath, oBindingContext);
            oOperation.execute().then(() => {
                let response = oOperation.getBoundContext().getObject();
                let data_uri_string = response.value;
                let link = document.createElement('a');
                link.href = data_uri_string;
                link.download = '${file_name}.png';
                link.click();
            }).catch((error) => {
                console.error(error);
            });*/
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
                    
                }).catch((error) => {

                   
                });
        }
    };
});
