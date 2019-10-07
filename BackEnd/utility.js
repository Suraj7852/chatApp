const jwt = require('jsonwebtoken');
const config = require('./config/config');
const nodemailer = require('nodemailer');
//require('dotenv').config();
require('dotenv').config();

module.exports = {
    verify(req, res, next)
    {
        var token = req.headers["token"];
        try {
            if(!token) return res.status(401).send("Access Denied Noo Token Found......");
            const decoded = jwt.verify(token, config.secret);
            //console.log(decoded.email);
            req.user = decoded.email;
            next();
        } catch (error) {
            console.log("error in token is not valid--", error);
            res.status(400).send("Invalid Token");
        } 
    },

    nodeMailer(res, resetToken, callback)
    { 
        //console.log('in utility'+process.env.password)
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            auth: {
                user: process.env.email,
                pass: process.env.password
            }
        });
        var mailOption = {
            from: process.env.email,
            to: res.email,
            subject: 'Sending Email through Node suraj',
            text: 'reset password link'+'    '+'http://localhost:3000/#!/reset/' + resetToken
        };
        transporter.sendMail(mailOption, function(error,info){
            if(error)
                callback(error);
            else{
                callback(null, info);
                console.log("Email sent");
            }
        });
    },

    token(res)
    {
        return jwt.sign({email: res.email}, config.secret, {expiresIn: "1d"});
    } 
};
