const cds = require('@sap/cds');
const LOG = cds.log('GenAI');

/**
 * 
 * @Before(event = { "CREATE" }, entity = "monicaSanchez_1_H04Srv.customerTickets")
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function(request) {
    const UserLoggedIn = cds.context.user;
    return request.reply({
        id: UserLoggedIn.attr.customer_id,
        customer_country: UserLoggedIn.attr.origin_country,
        customer_language: UserLoggedIn.attr.source_language,
        customer_name: UserLoggedIn.attr.customer_name
    });
}