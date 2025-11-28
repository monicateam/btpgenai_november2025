namespace MonicaSanchez_1_H04;

using {S4HCP_ServiceOrder_Odata} from '../srv/external/S4HCP_ServiceOrder_Odata.cds';

using {
    cuid,
    managed
} from '@sap/cds/common';

entity CustomerMessage : cuid {
    customerMessageID                 : Integer;
    titleEnglish                      : String(100);
    customerName                      : String(100);
    productName                       : String(100);
    summaryEnglish                    : String(500);
    messageCategory                   : String(50);
    messageUrgency                    : String(20);
    messageSentiment                  : String(20);
    titleCustomerLanguage             : String(100);
    customerId                        : String(50);
    productId                         : String(50);
    summaryCustomerLanguage           : String(500);
    originatingCountry                : String(50);
    sourceLanguage                    : String(20);
    fullMessageCustomerLanguage       : String(1000);
    fullMessageEnglish                : String(1000);
    suggestedResponseEnglish          : String(1500);
    suggestedResponseCustomerLanguage : String(1500);
    S4HCP_ServiceOrder                : Association to one S4HCP_ServiceOrder_Odata.A_ServiceOrder;
    deleted                           : Boolean;
}

annotate CustomerMessage with @assert.unique: {customerMessageID: [customerMessageID], };

entity ProductFAQ {
    key ID        : Integer;
        issue     : LargeString;
        question  : LargeString;
        answer    : LargeString;
        embedding : Vector(1536);
}


entity CustomerMessagesAttachments : cuid, managed {
    key ID                 : UUID @(Core.Computed: true);
        customerMessageKey : UUID;
        content            : LargeBinary  @Core.MediaType: mimeType  @odata.draft.skip;
        mimeType          : String  @Core.IsMediaType;
        fileName           : String;
        deleted            : Boolean;
}

annotate CustomerMessagesAttachments with @UI.MediaResource: {Stream: content} {
    content  @Core.MediaType: mimeType  @odata.draft.skip;
    mimeType @Core.IsMediaType;
  }
