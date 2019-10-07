const service = require('../services/UserServices');
const expressValidator = require('express-validator');

// This function is for register the user and what ever the input is given is correct or not
exports.registerController = (req, res) => {
    //console.log('controlller',req.body);
    // For checking weather the request input is correct or not    
    let responseResult = {};
    req.checkBody('firstName', 'First name is required').not().isEmpty();
    req.checkBody('lastName', 'Last name is required').not().isEmpty();
    req.checkBody('password').isLength({min: 6});
    req.checkBody('email').isEmail();
    var errors = req.validationErrors();
    
    
    if(errors) {
        responseResult.sucess = false;
        responseResult.message = "Validation Error";
        responseResult.errors = errors;
        return res.status(422).send(responseResult);
    }
    else{
        var registerObj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }
    // For checking weather the responce input is correct or not 
        service.registerService(registerObj, (err, result) => {
            if(err){
                responseResult.sucess = false;
                responseResult.message = "Validation Error";
                responseResult.errors = err;
                return res.status(422).send(responseResult);
            }else{
                responseResult.sucess = true;
                responseResult.message = "Registration success";
                responseResult.result = result;
                return res.status(200).send(responseResult);
            }
        })
    }
}

// To validate wether the user is register or not and checking request input is correct or not
exports.loginController = (req,res) => {
    let responseResult = {};
    req.checkBody('password').isLength({min: 6});
    req.checkBody('email').isEmail();
    var errors = req.validationErrors();
    if(errors) {
        responseResult.sucess = false;
        responseResult.message = "Validation Error";
        responseResult.errors = errors;
        return res.status(422).send(responseResult);
    }else{
        // For checking weather the responce input is correct or not 
        service.loginService(req.body, (err, result) => {
            if(err){
                responseResult.sucess = false;
                responseResult.message = "login Error";
                responseResult.errors = err;
                return res.status(400).send(responseResult);
            }else{
                responseResult.sucess = true;
                responseResult.message = "login Sucessfull...";
                responseResult.result = result;
                //responseResult.value = true;
                return res.status(200).send(responseResult);
                
            }
        })
    }
    
}

// This function is for forget the user and what ever the input is given is correct or not
exports.forgetController = (req,res) => {
    //console.log(req.email)
    let responseResult=  {};
    req.checkBody('email').isEmail();
    var errors = req.validationErrors();
    if(errors)
    {
        responseResult.sucess = false;
        responseResult.message = "validation failed";
        responseResult.error = errors;
        return res.status(422).send(responseResult);
    }
    // For checking weather the responce input is correct or not 
    service.forgetService(req.body, (err, result) => {
        if(err){
            responseResult.sucess = false;
            responseResult.errors = err;
            return res.status(400).send(responseResult);
        }else{
            responseResult.sucess = true;
            responseResult.result = result;
            responseResult.message = "sucessful.....";
            return res.status(200).send(responseResult);
        }
    })
}

// This function is for reset the user and what ever the input is given is correct or not
exports.resetController = (req, res) => {
    var registerObj = {
        email: req.user,
        password: req.body.password
    }
    //console.log("register Obj", registerObj)
    let responseResult = {};
        // For checking weather the responce input is correct or not 
    service.resetService(registerObj, (err, result) => {
        if(err){
            responseResult.sucess = false;
            responseResult.errors = err;
            return res.status(400).send(responseResult);
        }else{
            responseResult.sucess = true;
            responseResult.result = result;
            responseResult.message = "password reset";
            return res.status(200).send(responseResult);
        }
    })
}

// This function is to get info about the user those who have registered 
exports.getUserController = (req, res) => {
    let responseResult = {};
    service.getUserService(req.body, (err, result) => {
        if(err){
            responseResult.sucess = false;
            responseResult.errors = err;
            return res.status(400).send(responseResult);
        }else{
            responseResult.sucess = true;
            responseResult.result = result;
            responseResult.message = "sucessful.....";
            console.log(responseResult);
            return res.status(200).send(responseResult);
        }
    })
}