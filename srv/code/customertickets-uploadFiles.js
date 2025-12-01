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
	const customerTicketID = request.data.customerMessageID;
	if (!customerTicketID) {
		return request.reject(400, 'customerMessageID ID is missing.');
	}

	try {
		var contentBase64 = request.data.content;
		var decodedMedia = new Buffer.from(
            contentBase64.split(';base64,').pop(),
            'base64'
        );
		const readable = new Readable()
        readable.push(decodedMedia)
        readable.push(null)

    await INSERT.into('MonicaSanchez_1_H04.CustomerMessagesAttachments').entries({
		customerMessageKey: request.data.customerMessageID,
		content: readable,
		fileName: request.data.fileName,
		mimeType: request.data.mimeType
	});
	} catch (error) {
		LOG.error('Error insert file', error.message);
		return request.reject(500, `Error insert file ${request.data.fileName}`);
	}
}