sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"monicasanchez1h04/customerpanel/test/integration/pages/customerTicketsList",
	"monicasanchez1h04/customerpanel/test/integration/pages/customerTicketsObjectPage"
], function (JourneyRunner, customerTicketsList, customerTicketsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('monicasanchez1h04/customerpanel') + '/test/flpSandbox.html#monicasanchez1h04customerpanel-tile',
        pages: {
			onThecustomerTicketsList: customerTicketsList,
			onThecustomerTicketsObjectPage: customerTicketsObjectPage
        },
        async: true
    });

    return runner;
});

