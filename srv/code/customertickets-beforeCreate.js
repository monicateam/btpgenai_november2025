const cds = require('@sap/cds');
const LOG = cds.log('GenAI');
/**
 * 
 * @Before(event = { "CREATE" }, entity = "monicaSanchez_1_H04Srv.customerTickets")
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function(request) {
    const customerTicketID = request.data.ID;
    if (!customerTicketID) {
        return request.reject(400, 'CustomerTicket ID is missing.');
    }

    let customerTicketEntry;
    try {
        // Fetch the specific CustomerMessage entry for update
        customerTicketEntry = await SELECT.one('MonicaSanchez_1_H04.CustomerMessage').orderBy({ ref: ['customerMessageID'], sort: 'desc' });
        if (!customerTicketEntry) {
            return request.reject(404, `CustomerMessage with ID ${customerTicketEntry} not found.`);
        }

        request.data.customerId = "C004";
        request.data.originatingCountry = "Spain";
        request.data.sourceLanguage = "Spanish";
        request.data.customerName = "Prueba";
        request.data.customerMessageID = customerTicketEntry.customerMessageID + 1;
        // await UPDATE('customerTickets').set('customerMessageID', request.data.customerMessageID);
    } catch (error) {
        return request.reject(500, error);
    }

}