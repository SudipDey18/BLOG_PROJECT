import express from "express";
import userController from "../controllers/userControler.js";


const route = (express.Router());
const { SignUp,Login } = userController;


route.post('/signup',SignUp);
route.post('/login',Login);

export default route;