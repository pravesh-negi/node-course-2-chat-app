var socket=io();
// if we reload the http://localhost:3000/ in browser   then message will print in console says 'Connected to server'.
//socket.on("connect",()=>{  // ES 6 syntax.will not run in IE
socket.on("connect",function(){ // normal jquery syntax.
    console.log('Connected to server');

//    // this will emait createEmail in server.js page :-event is emitted from client to serve
//     socket.emit('createEmail',{
//         to:'jen@example.com',
//         text:'Hey. This is Andrew.'
//     });

        socket.emit('createMessage',{
            from:'Andrew',
            text:'Yup,that work for me.'
        });
});



//Event system in socket .IO :-
// when we prese ctrl+c then 'Disconnected from server' message print in the browser. 
// OR When we press ctrl+s then first 'Disconnected from server' message will print then
// 'Connected to server' message will print.
//socket.on("disconnect",()=>{   // ES 6 syntax.will not run in IE.
socket.on("disconnect",function(){
    console.log('Disconnected from server');
});


// socket.on('newEmail',function(email){
//     console.log('New email',email);
// });

socket.on('newMessage',function(message){
    console.log('newMessage',message);
});