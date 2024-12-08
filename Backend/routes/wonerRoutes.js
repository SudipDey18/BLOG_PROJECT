const express = require("express");
const route = (express.Router());
const wonerModle = require('../models/wonerModels');

route.get('/',(req,res)=>{
    res.send("woner/ page is Working");
});

console.log(process.env.NODE_ENV);


route.post('/create',async(req,res)=>{

    const {fullname,email,password} = req.body;
    console.log(req.body);
    
    let woners = await wonerModle.find();
    if (woners.length>0) {
        return res.status(503).send("Woner already exsist");
    }

    const woner = await wonerModle.create({
        fullname,
        email,
        password
    });

    res.send(woner);
})

module.exports = route;