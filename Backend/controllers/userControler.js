import userModel from "../models/userModel.js";
import managePassword from "../config/managePassword.js";
import authentication from "../config/authentication.js";

const {createUser,findUser} = userModel;
const {encryptPass,verifyPass} = managePassword;
const {generateToken, verifyToken} = authentication;

const isLogin = async (req,res) => {
    // console.log(req.params.jwtToken);
    const token = req.params.jwtToken
    
    if(!token){
        return res.send({isLogin: false});
    }
    const data = await verifyToken(token);
    if (data.Message) {
        // console.log(data.User);
        return res.send({
            isLogin: true,
            User: data.User
        });
        
    }else{
        return res.send({isLogin: false});
    }
}

// Signup
const SignUp = async (req,res) => {

    const data = await encryptPass(req.body.Password);
    if (data.error) {
        return res.send("Something went Wrong");
    }
    const newPass = data.Password;
    const message = await createUser(req.body,newPass);

    return res.send(message);
}


// Login
const Login = async(req,res) =>{
    let data = await findUser(req.body.Email);
    if (data.Error){
        // console.log(data.Error);
        return res.send({errorMessage: data.Error});
    }
    // console.log(data.User);
    const user = data.User;
    data = (await verifyPass(req.body.Password,user.Password));
    if (data.Error) {
        return res.send({errorMessage: "Something went Wrong"});
    }
    if (data.isCorrect) {
        // console.log(data.isCorrect);
        // Generate Token
        const Token = generateToken(user);
        // console.log(Token);

        return res.send({
            sucessMessage: "Login Sucessfully",
            jwtToken: Token
        });
    } else {
        // console.log(data.isCorrect);
        return res.send({errorMessage: "Invalid user or password"});
    }
}




const setCookie = (req,res)=>{
    const tok = "req.cookies.Token"
    res.cookie('Logo',tok);
    res.send('Cookie saved');
}

export default {isLogin,SignUp,Login, setCookie};