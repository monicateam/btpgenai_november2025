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
                Label : '{i18n>ProductName}',
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
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : '{i18n>TicketDetail}',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>Detail}',
            ID : 'i18nDetail',
            Target : '@UI.FieldGroup#i18nDetail',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>Response}',
            ID : 'Response',
            Target : '@UI.FieldGroup#Response',
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
            Label : '{i18n>Productname}',
            Value : productName,
        },
        {
            $Type : 'UI.DataField',
            Value : fullMessageCustomerLanguage,
            Label : '{i18n>Fullmessagecustomerlanguage}',
        },
        {
            $Type : 'UI.DataField',
            Value : messageUrgency,
            Label : '{i18n>Messageurgency}',
        },
        {
            $Type : 'UI.DataField',
            Value : suggestedResponseCustomerLanguage,
            Label : '{i18n>Suggestedresponsecustomerlanguage}',
        },
        {
            $Type : 'UI.DataField',
            Value : titleCustomerLanguage,
            Label : '{i18n>Titlecustomerlanguage}',
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
    UI.FieldGroup #i18nDetail : {
        $Type : 'UI.FieldGroupType',
        Data : [
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
        ],
    },
    UI.FieldGroup #Response : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Response}',
                Value : suggestedResponseCustomerLanguage,
            },
            {
                $Type : 'UI.DataField',
                Label : 'suggestedResponseEnglish',
                Value : suggestedResponseEnglish,
                @UI.Hidden,
            },
            {
                $Type : 'UI.DataField',
                Label : 'S4HCP_ServiceOrder_ServiceOrder',
                Value : S4HCP_ServiceOrder_ServiceOrder,
                @UI.Hidden,
            },
        ],
    },
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
    fullMessageCustomerLanguage @(
        UI.MultiLineText : true,
        Common.FieldControl : #Mandatory,
    )
};

annotate service.customerTickets with {
    summaryCustomerLanguage @(
        UI.MultiLineText : true,
        Common.FieldControl : #Mandatory,
    )
};

annotate service.customerTickets with {
    messageUrgency @(
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Severity',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : messageUrgency,
                    ValueListProperty : 'severity',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'ID',
                },
            ],
            Label : 'Urgency',
            PresentationVariantQualifier : 'vh_customerTickets_messageUrgency',
        },
        Common.ValueListWithFixedValues : true,
        Common.FieldControl : #Mandatory,
)};

annotate service.Severity with @(
    UI.PresentationVariant #vh_customerTickets_messageUrgency : {
        $Type : 'UI.PresentationVariantType',
        SortOrder : [
            {
                $Type : 'Common.SortOrderType',
                Property : ID,
                Descending : false,
            },
        ],
    }
);

annotate service.customerTickets with {
    messageCategory @(
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Category',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : messageCategory,
                    ValueListProperty : 'category',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'ID',
                },
            ],
            Label : 'Category',
        },
        Common.ValueListWithFixedValues : true,
        Common.FieldControl : #Mandatory,
)};

annotate service.customerTickets with {
    productName @Common.FieldControl : #Mandatory
};

annotate service.customerTickets with {
    titleCustomerLanguage @Common.FieldControl : #Mandatory
};

annotate service.customerTickets with {
    productId @Common.FieldControl : #Mandatory
};

