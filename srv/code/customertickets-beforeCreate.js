const cds = require('@sap/cds');
const LOG = cds.log('GenAI');
/**
 * 
 * @Before(event = { "CREATE" }, entity = "monicaSanchez_1_H04Srv.customerTickets")
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function(request) {
    const UserLoggedIn = cds.context.user;
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

        request.data.customerId = UserLoggedIn.attr.customer_id;
        request.data.originatingCountry = UserLoggedIn.attr.origin_country;
        request.data.sourceLanguage = UserLoggedIn.attr.source_language;
        request.data.customerName = UserLoggedIn.attr.customer_name;
        request.data.customerMessageID = customerTicketEntry.customerMessageID + 1;
        // await UPDATE('customerTickets').set('customerMessageID', request.data.customerMessageID);
    } catch (error) {
        return request.reject(500, error);
    }

}