const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./router/routes');
const expressValidator = require('express-validator');
const app = express();
// var server = require('http').createServer(app);
const socketIO = require('socket.io');

require('dotenv').config();

// we have user body-parser to change the format into any other format
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());
// To connect it to front end
app.use(express.static('../FrontEnd'));

const dbConfig = require('./config/config');
// It is the library for mongoDb and NodeJs
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//To connect to Database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(()=>{
    console.log("Database Sucessfully Connected.......");
}).catch(err => {
    console.log('Failed to connect to database........');
    process.exit();
});
//console.log('server');
app.use('/',routes);

app.get('/', (req, res) => {
    //console.log('server');
    res.json({"message": "Welcome to CHATAPP.............."});
});


var server = app.listen(3000, () => {
    console.log("Listening to localhost: 3000");
});

var io = socketIO(server);

// To know the user using the port and disconnecting
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("disconnect",() => {
        console.log('socket disconnected');
    })
});