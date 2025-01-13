import { clearCookie, createCookie } from "../helpers/cookies.js";
import { createToken } from "../helpers/jwt.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export async function registerUser(req,res) {
    try {
        const { username, password, isAdmin } = req.body;

        if ((!username || username.toString().length === 0) || (!password || password.toString().length === 0)) {
            console.log(username,password);
            return res.status(400).json({ success: false, message: "username and password are required" });
        }
        
        if(password.length<6){
            return res.status(400).json({success:false,message:"password must be atleast 6 characters long"})
        }

        const existingUser = await User.findOne({username});
    
        if(existingUser){
            return res.status(409).json({success:false,message:"username already exists"});
        }
        
        const newUser = new User({username,password,isAdmin});
        await newUser.save();

        return res.status(201).json({success:true,message:"user registered successfully"});
    } catch (error) {
        console.log(`Error while registering user: ${error}`);
        res.status(500).json({success:false,message:error.message})
    }
}

export async function loginUser(req,res) {
    const {username, password} = req.body;

    if(!username.trim() || !password.trim()){
        return res.status(400).json({success:false,message:"username and password are required"});
    }

    const user = await User.findOne({username});

    if(!user){
        return res.status(404).json({success:false,message:"username not exits"});
    }

    const isPasswordCorrect = await bcryptjs.compare(password,user.password);

    if(!isPasswordCorrect){
        return res.status(400).json({success:false,message:"Invalid credentials"});
    }
    const token = createToken(user._id);
    createCookie(res,"auth_token",token);

    return res.status(200).json({success:true,message:"user login success",userId:user._id});
}

export function logoutUser(req,res){
    clearCookie(res,"auth_cookie");
    return res.status(200).json({success:true,message:"logout user successfully"});
}