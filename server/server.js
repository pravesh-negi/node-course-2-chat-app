const path=require('path'); // path module need not to be installed.used to give better absolute path.
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

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

    // // this will emait newEmail in index.js page :-:-event is emitted from server to client(index.js)
    // socket.emit('newEmail',{
    //     from:'pravesh@example.com',
    //     text:'Hey.What is going on',
    //     createAt:123
    // });
 
    socket.emit('newMessage',{
        from:'pravesh@example.com',
        text:'Hey.What is going on',
        createdAt:123
    });



    // socket.on('createEmail',(newEmail)=>{
    //     console.log('createEmail',newEmail);
    // });

    socket.on('createMessage',(message)=>{
        console.log('createMessage',message);
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

