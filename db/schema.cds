namespace MonicaSanchez_1_H04;

using { S4HCP_ServiceOrder_Odata } from '../srv/external/S4HCP_ServiceOrder_Odata.cds';

using { cuid } from '@sap/cds/common';

entity CustomerMessage : cuid
{
    customerMessageID : Integer
        @mandatory;
    titleEnglish : String(100);
    customerName : String(100);
    productName : String(100);
    summaryEnglish : String(500);
    messageCategory : String(50);
    messageUrgency : String(20);
    messageSentiment : String(20);
    titleCustomerLanguage : String(100);
    customerId : String(50);
    productId : String(50);
    summaryCustomerLanguage : String(500);
    originatingCountry : String(50);
    sourceLanguage : String(20);
    fullMessageCustomerLanguage : String(1000);
    fullMessageEnglish : String(1000);
    suggestedResponseEnglish : String(1000);
    suggestedResponseCustomerLanguage : String(1000);
    S4HCP_ServiceOrder : Association to one S4HCP_ServiceOrder_Odata.A_ServiceOrder;
}

annotate CustomerMessage with @assert.unique :
{
    customerMessageID : [ customerMessageID ],
};

entity ProductFAQ
{
    key ID : Integer;
    issue : LargeString;
    question : LargeString;
    answer : LargeString;
    embedding : Vector(1536);
}
