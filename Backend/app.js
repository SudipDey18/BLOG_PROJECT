const express = require('express');
const { pool } = require('./config/db');
const { Login } = require('./controllers/userControler');
const bodyParser = require('body-parser');
const { createUser } = require('./models/userModel');


require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login',async(req,res)=>{
    res.send("signUp page")
});
app.post('/create',async(req,res)=>{
    await createUser(req.body).then((val)=>{
        return res.status(200).send(val);
    }).catch((err)=>{
        return res.status(500).send(err);
    })
});

pool.promise().query("SELECT 1")
.then( ()=> {
    app.listen(process.env.Port, ()=>{
        console.log(`server is running at http://localhost:${process.env.Port}/`);
    }).on('error',(err)=>{
        console.error("Somethig went wrong",err);
    })
})
.catch((e)=>{
    console.log(e);
});