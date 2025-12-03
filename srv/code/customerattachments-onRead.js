const cds = require('@sap/cds');
const LOG = cds.log('GenAI');
const customertickets_downloadUploadedFiles = require('./customertickets-downloadFiles');

/**
 * 
 * @On(event = { "" }, entity = "monicaSanchez_1_H04Srv.CustomerMessagesAttachments")
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 * @param {Function} next - Callback function to the next handler
*/
module.exports = async function (request, next) {
	if (!request.data.ID) {
        return next()
    }
    const url = request._.req.path
    if (url.includes('content')) {
        return customertickets_downloadUploadedFiles(request);
    }
    else return next()
}