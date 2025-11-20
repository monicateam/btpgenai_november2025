sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"monicasanchez1h04/customermessagemyapplication/test/integration/pages/CustomerMessageList",
	"monicasanchez1h04/customermessagemyapplication/test/integration/pages/CustomerMessageObjectPage"
], function (JourneyRunner, CustomerMessageList, CustomerMessageObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('monicasanchez1h04/customermessagemyapplication') + '/test/flpSandbox.html#monicasanchez1h04customermessa-tile',
        pages: {
			onTheCustomerMessageList: CustomerMessageList,
			onTheCustomerMessageObjectPage: CustomerMessageObjectPage
        },
        async: true
    });

    return runner;
});

