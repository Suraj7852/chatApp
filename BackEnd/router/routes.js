const express = require('express');
const router = express.Router();
const user = require('../controller/UserController');
const userChat = require('../controller/chatController');
const auth = require('../utility'); 

//This are the api
router.post('/register', user.registerController);
router.post('/login', user.loginController);
router.post('/forget', user.forgetController);
router.get('/dashboard', user.getUserController);
router.post('/reset',auth.verify, user.resetController);
//router.post('/dashboard', userChat.saveMessageController);
//router.post('/message', userChat.saveMessageController);

module.exports = router;

