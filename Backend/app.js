const express = require('express');
require("dotenv").config();


const app = express();

app.get('/login',(req,res)=>{
    res.send("Login Page");
});
app.get('/Create',(req,res)=>{
    res.send("signUp page")
})

app.listen(process.env.Port, ()=>{
    console.log(`server is running at http://localhost:${process.env.Port}/`);
}).on('error',(err)=>{
    console.error("Somethig went wrong",err);
});