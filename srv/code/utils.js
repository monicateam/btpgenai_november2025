const cds = require('@sap/cds');
const LOG = cds.log('GenAI');

async function isAudioType(mimeType) { 
    if(mimeType.split('/')[0] === 'audio'){
       return true;
    }
    return false;
}

async function isImage(mimeType) {
    if(mimeType.split('/')[0] === 'image'){
       return true;
    }
    return false;
}

module.exports = { isAudioType, isImage };