const cds = require('@sap/cds');
const LOG = cds.log('GenAI');

// Configuration object for the LLM, specifying model name and parameters.
const LLM_CONFIG = {
    name: 'gpt-4o-mini',
    params: {
        temperature: 0.1,
        response_format: {
            type: 'json_object',
        },
    }
};

// System message to set the context for the LLM.
const SYSTEM_MESSAGE = { role: 'system', content: 'You are a support agent for our freezers products' };
// Function to create an orchestration client using the specified prompt.
async function createOrchestrationClient(prompt) {
    const { OrchestrationClient, buildAzureContentSafetyFilter } = await import('@sap-ai-sdk/orchestration');
    return new OrchestrationClient({
        promptTemplating: {
            model: LLM_CONFIG,
            prompt: {
                template: [
                    SYSTEM_MESSAGE,
                    { role: 'user', content: prompt }
                ]
            }
        },
        filtering: {
            input: {
                filters: [buildAzureContentSafetyFilter('input', { self_harm: 0 })]
            }
        }
    });
}



async function createOrchestrationToAnalyzeFile(prompt) {
    const { OrchestrationClient, buildAzureContentSafetyFilter } = await import('@sap-ai-sdk/orchestration');
    return new OrchestrationClient({
        promptTemplating: {
            model: LLM_CONFIG,
            prompt: {
                template: [
                    SYSTEM_MESSAGE,
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: `${prompt}`,
                            },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: '{{?fileAnalyze}}'
                                }
                            }
                        ]
                    }
                ]
            }
        },
        filtering: {
            input: {
                filters: [buildAzureContentSafetyFilter('input', { self_harm: 0 })]
            }
        }
    });
}

async function createOrchestrationToAnalyzeAudio(prompt) {
    const { OrchestrationClient, buildAzureContentSafetyFilter } = await import('@sap-ai-sdk/orchestration');
    return new OrchestrationClient({
        promptTemplating: {
            model: LLM_CONFIG,
            prompt: {
                template: [
                    SYSTEM_MESSAGE,
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: `${prompt}`,
                            },
                            {
                                type: 'audio_url',
                                audio_url: {
                                    url: '{{?fileAudio}}'
                                }
                            }
                        ]
                    }
                ]
            }
        },
        filtering: {
            input: {
                filters: [buildAzureContentSafetyFilter('input', { self_harm: 0 })]
            }
        }
    });
}

// Preprocess customer message by categorizing, translating, and summarizing.
// Takes title and full message in customer's language.
// Returns structured JSON with translated title and message, summaries, categories, urgency, and sentiment.

async function preprocessCustomerMessage(titleCustomerLanguage, fullMessageCustomerLanguage) {
    const prompt = `
    Categorize the fullMessageCustomerLanguage into one of (Technical, Delivery, Service). 
    Classify urgency of the fullMessageCustomerLanguage into one of (High, Medium, Low). 
    Classify sentiment of the fullMessageCustomerLanguage into one of (Negative, Positive, Neutral). 
    Translate fullMessageCustomerLanguage to English and put it in fullMessageEnglish.
    Summarize fullMessageCustomerLanguage into 20 words max and keep the original language and put it in summaryCustomerLanguage. 
    Translate the summaryCustomerLanguage to English and put it in summaryEnglish.
    Translate the titleCustomerLanguage to English and put it in titleEnglish. 
    Here is the titleCustomerLanguage and fullMessageCustomerLanguage:
    titleCustomerLanguage: {{?titleCustomerLanguage}}
    fullMessageCustomerLanguage: {{?fullMessageCustomerLanguage}}
    Return the result in the following JSON template:
    {
        fullMessageEnglish: Text,
        titleEnglish: Text, 
        summaryCustomerLanguage: Text, 
        summaryEnglish: Text, 
        messageCategory: Text, 
        messageUrgency: Text, 
        messageSentiment: Text
    }`;

    try {
        const orchestrationClient = await createOrchestrationClient(prompt);
        const response = await orchestrationClient.chatCompletion({
            placeholderValues: {
                titleCustomerLanguage,
                fullMessageCustomerLanguage
            }
        });
        return JSON.parse(response.getContent());
    } catch (error) {
        LOG.error('Error in preprocessing:', error);
        throw new Error('Preprocessing service failed.');
    }
}

module.exports = { preprocessCustomerMessage };

async function generateResponseTechMessage(issue, question, answer, fullMessageCustomerLanguage, soContext) {
    // Define a prompt that provides the context for generating a technical response
    const prompt = `
    Generate a helpful reply message including the troubleshooting procedure to the newCustomerMessage based on previousCustomerMessages and relevantFAQItem:
    relevantFAQItem: issue - {{?issue}}, Question - {{?question}} and Answer - {{?answer}}
    newCustomerMessage: {{?fullMessageCustomerLanguage}}
    previousCustomerMessages: {{?soContext}}
    Produce the reply in two languages: in the original language of newCustomerMessage and in English. Return the result in the following JSON template:
    {
        suggestedResponseEnglish: Text,
        suggestedResponseCustomerLanguage: Text
    }`;

    try {
        // Create orchestration client using the generated prompt
        const orchestrationClient = await createOrchestrationClient(prompt);
        // Get the response by providing the required input parameters
        const response = await orchestrationClient.chatCompletion({
            placeholderValues: { issue, question, answer, fullMessageCustomerLanguage, soContext }
        });
        // Parse and return the generated response in JSON format
        return JSON.parse(response.getContent());
    } catch (error) {
        // Log an error message and re-throw an error if response generation fails
        LOG.error('Error generating tech message response:', error);
        throw new Error('Response generation service failed.');
    }
}

async function generateResponseOtherMessage(messageSentiment, fullMessageCustomerLanguage, soContext) {
    // Determine message type based on customer sentiment (either an apology or a thank you note)
    const messageType = messageSentiment === 'Negative' ? 'a "we are sorry" note' : 'a gratitude note';
    const prompt = `
    Generate {{?messageType}} to the newCustomerMessage base on prevoiuse customer messages previousCustomerMessages. 
    newCustomerMessage: {{?fullMessageCustomerLanguage}}
    previousCustomerMessages: {{?soContext}}
    Produce the reply in two languages: in the original language of newCustomerMessage and in English. Return the result in the following JSON template:
    {
        suggestedResponseEnglish: Text,
        suggestedResponseCustomerLanguage: Text
    }`;

    try {
        // Create orchestration client using the generated prompt
        const orchestrationClient = await createOrchestrationClient(prompt);
        // Get the response by providing the required input parameters
        const response = await orchestrationClient.chatCompletion({
            placeholderValues: { messageType, fullMessageCustomerLanguage, soContext }
        });
        // Parse and return the generated response in JSON format
        return JSON.parse(response.getContent());
    } catch (error) {
        // Log an error message and re-throw an error if response generation fails
        LOG.error('Error generating other message response:', error);
        throw new Error('Response generation service failed.');
    }
}

async function getDescriptionAboutFile(base64File,mimeType, userLanguage) {
    const prompt = `
    Generate a description in English from the submitted file submitted by the user and put it in fileDescriptionEnglish.
    Translate fileDescriptionEnglish to {{?userLanguage}} language and put it in fileDescriptionUserLanguage.
    Return a true if the descriptions from before a Fridge is found, otherwise return false in fileAboutIsAboutFridge.
    Return the result in a JSON like the following template:
    {
        fileDescriptionEnglish: text,
        fileDescriptionUserLanguage: text,
        fileAboutIsAboutFridge: Boolean
    }
    `;
    try {
        // Create orchestration client using the generated prompt
        const orchestrationClient = await createOrchestrationToAnalyzeFile(prompt);
        // Get the response by providing the required input parameters
        const response = await orchestrationClient.chatCompletion({
            placeholderValues: { 
                fileAnalyze: base64File,
                userLanguage
            }
        });
        // Parse and return the generated response in JSON format
        return JSON.parse(response.getContent());
    } catch (error) {
        // Log an error message and re-throw an error if response generation fails
        LOG.error('Error generating other message response:', error);
        throw new Error('Response generation service failed.');
    }
}

async function getDescriptionAboutSound(base64File,userLanguage) {
    const prompt = `
    Generate a description in English from the submitted audio submitted by the user and put it in fileDescriptionEnglish.
    Translate fileDescriptionEnglish to {{?userLanguage}} language and put it in fileDescriptionUserLanguage.
    Return a true if the descriptions from before a Fridge is found, otherwise return false in fileAboutIsAboutFridge.
    Return the result in a JSON like the following template:
    {
        fileDescriptionEnglish: text,
        fileDescriptionUserLanguage: text,
        fileAboutIsAboutFridge: Boolean
    }
    `;
    try {
        // Create orchestration client using the generated prompt
        const orchestrationClient = await createOrchestrationToAnalyzeAudio(prompt);
        // Get the response by providing the required input parameters
        const response = await orchestrationClient.chatCompletion({
            placeholderValues: { 
                fileAudio: base64File,
                userLanguage
            }
        });
        // Parse and return the generated response in JSON format
        return JSON.parse(response.getContent());
    } catch (error) {
        // Log an error message and re-throw an error if response generation fails
        LOG.error('Error generating other message response:', error);
        throw new Error('Response generation service failed.');
    }
}

module.exports = {
    preprocessCustomerMessage, 
    generateResponseTechMessage, 
    generateResponseOtherMessage,
    getDescriptionAboutFile,
    getDescriptionAboutSound
};