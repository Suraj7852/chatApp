const chatModel = require('../models/ChatModels');

exports.saveMessageService = (messageDetails,callback) => {
    chatModel.saveMessageModel(messageDetails,(err,result) => {
        if(err)
        {
            callback(err);
            console.log("from service");
            
        }
        else
            callback(null, result);
    })
}