using { S4HCP_ServiceOrder_Odata } from './external/S4HCP_ServiceOrder_Odata.cds';

using { MonicaSanchez_1_H04 as my } from '../db/schema.cds';

@path : '/service/monicaSanchez_1_H04'
service monicaSanchez_1_H04Srv
{
    entity ServiceOrderCreation
    {
        key ServiceOrderNumber: String(10);
        ServiceOrderDurationProduct : String(40);
        ServiceOrderDuration : Integer;
        ServiceOrderDurationUnit : String(3);
        ServiceOrderDurationDescription : String(40);
        ServiceOrderQuantityProduct : String(40);
        ServiceOrderQuantity : Integer;
        ServiceOrderQuantityUnit : String(3);
        SerrviceOrderQuantityDescription : String(40);
        PersonResponsible : String(10);
        ServiceOrderType : String(4);
        ServiceOrderLanguage: String(2);
        ServiceOrderDocumentPriority : String(1);
        ServiceOrderSalesOrganization : String(4);
        serviceOrderDistributionChannel : String(2);
        ServiceOrderDivision : String(2);
        ServiceOrderSoldToParty : String(10);
    }

    @odata.draft.enabled
    entity CustomerMessage as
        projection on my.CustomerMessage
        actions
        {
            @cds.odata.bindingparameter.name : '_it'
            @Common.SideEffects : 
            {
                TargetProperties :
                [
                    '_it/suggestedResponseEnglish',
                    '_it/suggestedResponseCustomerLanguage'
                ]
            }
            action Action1
            (
            );

            @cds.odata.bindingparameter.name : '_it'
            @Common.SideEffects : 
            {
                TargetProperties :
                [
                    '_it/S4HCP_ServiceOrder_ServiceOrder'
                ]
            }
            action Action2
            (
                ServiceOrderDetail : ServiceOrderCreation
            );
        };

    entity A_ServiceOrder as
        projection on S4HCP_ServiceOrder_Odata.A_ServiceOrder
        {
            ServiceOrder,
            ServiceOrderDescription
        };

    @odata.draft.enabled
    entity ProductFAQ as
        projection on my.ProductFAQ
        {
            ID,
            issue,
            question,
            answer
        };

    @odata.draft.enabled
    entity customerTickets as
        projection on my.CustomerMessage;
}

annotate monicaSanchez_1_H04Srv with @requires :
[
    'authenticated-user'
];
