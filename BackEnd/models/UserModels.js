const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const util = require('../utility');

// to initialize the fild which is required 
const schema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    token:{
        type: String,
        default: null
    },
    saltSecret: String
},{
    timestamp: true
});

// To change that password into a dummy string
schema.pre('save', function(next){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err,hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

let User = mongoose.model('user', schema);

class userModel {
    hash(password) {
        const saltRounds = 10;
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(password, salt);
        return hash;
    }
    //creating the object for register the user
    register(data, callback) {
        let user = new User({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        });
        // to save the data in the database
        user.save((err, result) => {
            if(err){
                console.error(err);
                callback(err);
            }else{
                callback(null, result)
            }
        });
    }

    //first we are chacking wether the user is register or not
    login(data, callback) {
        User.findOne({email: data.email}, (err, res) => {
            if(err) {
                console.log("model");  
                callback(err);
            }
            else if(!res){
                callback({message: "user not found..."});
            }
            else{
                // to check the password
            bcrypt.compare(data.password, res.password, (err, result) => {
                if(err) {
                    callback(err);
                }
                else if(result)
                {
                    callback(null, res)
                    console.log("Login Sucessfull....");
                }   
                else{
                    console.log("login Failed...");
                    callback({mesage: "wrong Password..."});
                }
            })}
        });
    }

    // first we have to check the email is exists or not
    forget(data, callback) {
        User.findOne({email: data.email},(err,res) => {
            if(err)
                callback(err);
            else if(!res)
                callback({message:"User not found.."});
            else{
                //it will generate the token
                var resetToken = util.token(res);
                User.updateOne({ email: res.email}, {token: resetToken}, (err, info) => {
                    if(err)
                        callback(err);
                    else{
                        util.nodeMailer(res, resetToken, callback);
                    }     
                })
            }
        });
    };

    // it will take that token and it will change the password
    reset(req, callback) {
        User.findOne({email: req.email},(err, res)=>{
            if(err)
                callback(err);
            else
            {
                if(config.token == req.token) {
                    User.updateOne({email: res.email}, {password: this.hash(req.password)}, (err,info) => {
                        if(err)
                            callback(err);
                        else
                            callback(null, res);
                    })
                }
            }
        })
    }
    //it will take inf about all register user
    getAllUser(req, callback) {
        User.find({}, {_id: 0, firstName: 1, email: 1}, (err,res) => {
            if(err)
                callback(err);
            else
                callback(null, res)
        })
    }
}

module.exports = {
    userModel: new userModel(),
    User: User
}