const mongoose = require('mongoose');
const chatSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    senderId:{
        type: String,
        required: true
    },
    senderName:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
},{
    timestamp: true
});

let chatMessage = mongoose.model('messageDetail', chatSchema);

class chatModel {
    saveMessageModel(data, callback){
        let messageDetail = new chatMessage({
            userId: data.userId,
            userName: data.userName,
            senderId: data.senderId,
            senderName: data.senderName,
            message: data.message
        });
        messageDetail.save((err,result) => {
            if(err)
            {
                callback(err);
                console.log("from model");
            }
            else
                callback(null,result)
        });
    }
}
let modelChat = new chatModel();
module.exports = modelChat;