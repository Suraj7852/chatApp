const serviceChat = require('../services/ChatService');
const expressValidator = require('express-validator');

exports.saveMessageController = (req,res) => {
    let responseResult = {};
    req.checkBody('userId', 'userId is required').not().isEmpty();
    req.checkBody('userName', 'User Name is required').not().isEmpty();
    req.checkBody('senderId', 'Sender Id is required').not().isEmpty();
    req.checkBody('senderName', 'Sender Name is required').not().isEmpty();
    req.checkBody('message', 'message is required').not().isEmpty();
    var errors = req.validationErrors();

    if(errors)
    {
        responseResult.sucess = false;
        responseResult.message = "Validation Error from req";
        responseResult.errors = errors;
        return res.status(422).send(responseResult);
    }
    else{
        console.log("req is fine");
        var messageObj = {
            userId: req.body.userId,
            userName: req.body.userName,
            senderId: req.body.senderId,
            senderName: req.body.senderName,
            message: req.body.message
        }
        serviceChat.saveMessageService(messageObj,(err, result) => {
            if(err)
            {
                responseResult.sucess = false;
                responseResult.message = "Validation Error from res";
                responseResult.errors = errors;
                return res.status(422).send(responseResult);
            }
            else
            {
                responseResult.sucess = true;
                responseResult.message = "message sent";
                responseResult.result = result;
                return res.status(200).send(responseResult);
            }
        })
    }
}