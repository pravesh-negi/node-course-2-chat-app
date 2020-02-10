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
io.on('connection',(socket)=>{
    // if we reload the http://localhost:3000/ in browser or press ctrl+s then message will print in terminal says 'New user connected'.
    console.log('New user connected');

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

