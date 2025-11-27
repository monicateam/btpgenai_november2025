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
		customerTicketEntry = await SELECT.one('MonicaSanchez_1_H04.CustomerMessage').where({ ID: customerTicketID }).forUpdate();
		if (!customerTicketEntry) {
			return request.reject(404, `CustomerMessage with ID ${customerTicketEntry} not found.`);
		}
	} catch (error) {
		LOG.error('Failed to retrieve the CustomerMessage item', error.message);
		return request.reject(500, `Failed to retrieve the CustomerMessage item ${customerTicketID}`);
	}

	try {
		// Update the ProductFAQ entry with the generated embedding
		await UPDATE('MonicaSanchez_1_H04.CustomerMessage').set({ customerId: "C004" }).where({ customerTicketID });
		LOG.info(`CustomerMessage with ID ${customerTicketID} updated with the customer Id retrieved from the user.`);
	} catch (error) {
		LOG.error('Failed to update the CustomerMessage item', error.message);
		//return request.reject(500, `Failed to update the FAQ item ${ID}`);
	}
}