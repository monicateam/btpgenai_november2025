using monicaSanchez_1_H04Srv as service from '../../srv/service';
annotate service.customerTickets with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'customerMessageID',
                Value : customerMessageID,
                @UI.Hidden,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Titleenglish}',
                Value : titleEnglish,
                @UI.Hidden,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Customername}',
                Value : customerName,
                @UI.Hidden,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Product}',
                Value : productName,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Summaryenglish}',
                Value : summaryEnglish,
                @UI.Hidden,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Category}',
                Value : messageCategory,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Urgency}',
                Value : messageUrgency,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Messagesentiment}',
                Value : messageSentiment,
                @UI.Hidden,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Title}',
                Value : titleCustomerLanguage,
            },
            {
                $Type : 'UI.DataField',
                Label : 'customerId',
                Value : customerId,
                @UI.Hidden,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Product}',
                Value : productId,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>SummaryOfTheTicket}',
                Value : summaryCustomerLanguage,
            },
            {
                $Type : 'UI.DataField',
                Label : 'originatingCountry',
                Value : originatingCountry,
                @UI.Hidden,
            },
            {
                $Type : 'UI.DataField',
                Label : 'sourceLanguage',
                Value : sourceLanguage,
                @UI.Hidden,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>FullDetail}',
                Value : fullMessageCustomerLanguage,
            },
            {
                $Type : 'UI.DataField',
                Label : 'fullMessageEnglish',
                Value : fullMessageEnglish,
                @UI.Hidden,
            },
            {
                $Type : 'UI.DataField',
                Label : 'suggestedResponseEnglish',
                Value : suggestedResponseEnglish,
                @UI.Hidden,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Response}',
                Value : suggestedResponseCustomerLanguage,
            },
            {
                $Type : 'UI.DataField',
                Label : 'S4HCP_ServiceOrder_ServiceOrder',
                Value : S4HCP_ServiceOrder_ServiceOrder,
                @UI.Hidden,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : '{i18n>TicketDetail}',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : '{i18n>Customermessageid}',
            Value : customerMessageID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'productName',
            Value : productName,
        },
        {
            $Type : 'UI.DataField',
            Value : fullMessageCustomerLanguage,
            Label : 'fullMessageCustomerLanguage',
        },
        {
            $Type : 'UI.DataField',
            Value : messageUrgency,
            Label : 'messageUrgency',
        },
        {
            $Type : 'UI.DataField',
            Value : suggestedResponseCustomerLanguage,
            Label : 'suggestedResponseCustomerLanguage',
        },
        {
            $Type : 'UI.DataField',
            Value : titleCustomerLanguage,
            Label : 'titleCustomerLanguage',
        },
        {
            $Type : 'UI.DataField',
            Value : summaryCustomerLanguage,
            Label : '{i18n>Summarycustomerlanguage}',
        },
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : customerMessageID,
        },
        TypeName : '{i18n>SupportTicket}',
        TypeNamePlural : '{i18n>SupportTickets}',
    },
    UI.DeleteHidden : true,
);

annotate service.customerTickets with {
    S4HCP_ServiceOrder @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'A_ServiceOrder',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : S4HCP_ServiceOrder_ServiceOrder,
                ValueListProperty : 'ServiceOrder',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'ServiceOrderDescription',
            },
        ],
    }
};

annotate service.customerTickets with {
    customerId @Common.FieldControl : #ReadOnly
};

annotate service.customerTickets with {
    originatingCountry @Common.FieldControl : #ReadOnly
};

annotate service.customerTickets with {
    sourceLanguage @Common.FieldControl : #ReadOnly
};

annotate service.customerTickets with {
    suggestedResponseCustomerLanguage @Common.FieldControl : #ReadOnly
};

annotate service.customerTickets with {
    fullMessageCustomerLanguage @UI.MultiLineText : true
};

annotate service.customerTickets with {
    summaryCustomerLanguage @UI.MultiLineText : true
};

