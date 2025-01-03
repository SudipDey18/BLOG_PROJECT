import express from 'express';
import pool from './config/db.js';
import SignUp from './controllers/userControler.js';
import bodyParser from 'body-parser';
import createUser from './models/userModel.js';
import userRouter from './routes/userRouter.js'


import dotenv from "dotenv"
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user',userRouter)

app.post('/login',async(req,res)=>{
    res.send("signUp page")
});
// app.post('/create',async(req,res)=>{
//     await createUser(req.body).then((val)=>{
//         return res.status(200).send(val);
//     }).catch((err)=>{
//         return res.status(500).send(err);
//     })
// });




pool.query("SELECT 1")
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