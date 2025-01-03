import userModel from "../models/userModel.js";
import managePassword from "../config/managePassword.js";

const {createUser,findUser} = userModel;
const {encryptPass,verifyPass} = managePassword;


const SignUp = async (req,res) => {

    const data = await encryptPass(req.body.Password);
    if (data.error) {
        return res.send("Something went Wrong");
    }
    const newPass = data.Password;
    const message = await createUser(req.body,newPass);

    return res.send(message);
}
const Login = async(req,res) =>{
    const data = await findUser(req.body.Email);
    if (data.error){
        return res.send(data.error);
    }
    console.log(data.user);
    const user = data.user;
    const isCorrect = (await verifyPass(req.body.Password,user.Password)).isCorrect;
    if (isCorrect) {
        return res.send("Login Successfully");
    }else{
        return res.send("Invalid password");
    }
}

export default {SignUp,Login};