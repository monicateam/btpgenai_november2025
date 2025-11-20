sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"monicasanchez1h04/productfaqapp/test/integration/pages/ProductFAQList",
	"monicasanchez1h04/productfaqapp/test/integration/pages/ProductFAQObjectPage"
], function (JourneyRunner, ProductFAQList, ProductFAQObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('monicasanchez1h04/productfaqapp') + '/test/flpSandbox.html#monicasanchez1h04productfaqapp-tile',
        pages: {
			onTheProductFAQList: ProductFAQList,
			onTheProductFAQObjectPage: ProductFAQObjectPage
        },
        async: true
    });

    return runner;
});

