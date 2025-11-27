sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'monicasanchez1h04.customerpanel',
            componentId: 'customerTicketsList',
            contextPath: '/customerTickets'
        },
        CustomPageDefinitions
    );
});