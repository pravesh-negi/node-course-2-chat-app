const path=require('path'); // path module need not to be installed.used to give better absolute path.
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

const {generateMessage}=require('./utils/message');
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT || 3000; 
var app=express();
var server=http.createServer(app); // using http server as opposed to express server.
var io=socketIO(server);

//socket.io.js :-This give us the library and gives us access to calling that IO method which starts the connection process.
                
app.use(express.static(publicPath));

 // It lets you register an event listener.we can listen for a specific event and do something when that event happens.
 // so io.on use for connection event
io.on('connection',(socket)=>{
    // If we reload the http://localhost:3000/ in browser or press ctrl+s then message will print in terminal says 'New user connected'.
    console.log('New user connected');

    // socket.emit from Admin text welcome to the chat app
    // when we load the url :-http://localhost:3000/ then this message will print.and this tab of browser will be admin her.
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app')); 

    // socket.broadcast.emit from Admin text New user joined.
    // when we load the url http://localhost:3000/ in second tab then we will get the 'Welcome to the chat app'
    // message from above emit of socket then in first tab we got another message like New user joined
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));  

    //---------------------------------

    // this will emait newEmail in index.js page :-:-event is emitted from server to client(index.js)
    //socket.emit('newEmail',{from:'pravesh@example.com',text:'Hey.What is going on',createAt:123});
    
    //socket.emit('newMessage',{from:'pravesh@example.com',text:'Hey.What is going on',createdAt:123}); 

    //socket.on('createEmail',(newEmail)=>{console.log('createEmail',newEmail);});

    socket.on('createMessage',(message)=>{
        console.log('createMessage',message);

        // it will emits an event to every single connection here. or send the message to every connected user including the currently connected user.i.e :- we have to open http://localhost:3000/  url in two tab of browser and then in console type the emit message like socket.emit('createMessage',{from:'Andrew',text:'Yup,that work for me.'});with this we got this message in two open tab of browser.   
        
        io.emit('newMessage',generateMessage(message.from,message.text));  

        // let say second tab of browser broadcasting the event which means it only got received by other connection such as tab one or any other connected user with broadcasting in place.

        //socket.broadcast.emit('newMessage',{from:message.from,text:message.text,createdAt:new Date().getTime()}); 


    });

    // if we close the browser then this message will print in terminal says User was disconnected.
    socket.on('disconnect',()=>{
        console.log('User was disconnected');
    });
});

server.listen(port,()=>{
    console.log('Server is up on port 3000');
});

// Console.log(__dirname+'/../public');
// console.log(publicPath);

//---------- Output :-
// we save in the terminal new user is connected will get print and if we reload the browser 'New yse connected' will get print.

