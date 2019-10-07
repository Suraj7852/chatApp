const model = require('../models/UserModels');

//to check the responce result is correct or not
// Or it is giving an error
exports.registerService = (data, callback) => {
    model.userModel.register(data,(err, result) => {
        if(err)
            callback(err);
        else
            callback(null, result);
    })  
}

exports.loginService = (data,callback) => {
    model.userModel.login(data, (err,result) => {
        if(err)
        {
            callback(err);
        }           
        else
            callback(null, result);
    })
}

exports.forgetService = (data,callback) => {
    model.userModel.forget(data, (err,result) => {
        if(err)
            callback(err);
        else
            callback(null, result);
    })
}

exports.resetService = (data,callback) => {
    model.userModel.reset(data, (err,result) => {
        if(err)
            callback(err);
        else
            callback(null, result);
    })
}

exports.getUserService = (data,callback) => {
    model.userModel.getAllUser(data, (err,result) => {
        if(err)
            callback(err);
        else
            callback(null, result);
    })
}