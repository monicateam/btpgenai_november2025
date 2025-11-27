sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'monicasanchez1h04.customerpanel',
            componentId: 'customerTicketsObjectPage',
            contextPath: '/customerTickets'
        },
        CustomPageDefinitions
    );
});