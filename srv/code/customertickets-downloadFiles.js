const cds = require('@sap/cds');
const LOG = cds.log('GenAI');
const {
	Readable,
	PassThrough
} = require('stream')
/**
 * 
 * @Before(event = { "CREATE" }, entity = "monicaSanchez_1_H04Srv.customerTickets")
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function(request) {
    const customerTicketID = request.data.ID;
    if (!customerTicketID) {
        return request.reject(400, 'customerMessageID ID is missing.');
    }

    const attachmentID = request.data.ID;
    if (!attachmentID) {
        return request.reject(400, 'attachmentID ID is missing.');
    }

    let attachmentFile;
    try {
        // Retrieve the CustomerMessage record based on the provided ID
        attachmentFile = await SELECT.one.from('MonicaSanchez_1_H04.CustomerMessagesAttachments', ["content","mimeType","fileName"]).where({ ID: attachmentID });
        if (!attachmentFile) {
            throw new Error(`attachmentID with ID ${attachmentID} not found.`);
        }
    } catch (error) {
        LOG.error('Failed to retrieve customer message', error.message);
        return request.reject(500, `Failed to retrieve customer message with ID ${attachmentID}`);
    }
        
    return request.reply(attachmentFile.content, {
        mimetype: attachmentFile.mimeType, // > optional
        filename: attachmentFile.fileName, // > optional
    });
}