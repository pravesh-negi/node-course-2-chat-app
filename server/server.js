const path=require('path'); // path module need not to be installed.used to give better absolute path.
const express=require('express');

const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT || 3000;
var app=express();

app.use(express.static(publicPath));

app.listen(port,()=>{
    console.log('Server is up on port 3000');
});

// Console.log(__dirname+'/../public');
// console.log(publicPath);