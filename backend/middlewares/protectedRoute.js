import { verifyToken } from "../helpers/jwt.js";
import User from "../models/user.model.js";

export async function protectedRoute(req,res,next){
    const authCookie = req.cookies.auth_token;
    if(!authCookie){
        return res.status(400).json({success:false,message:"unauthorized access: missing auth cookie"});
    }
    const decoded = verifyToken(authCookie);
    if(!decoded){
        return res.status(400).json({success:false,message:"unauthorized access: Invalid auth cookie"});
    }
    const userId = decoded.userId;
    const user = await User.findById(userId);
    if(!user){
        return res.status(404).json({success:false,message:"user not found"});
    }
    if(user.isAdmin){
        req.isAdmin = true;
    }
    req.isAuthenticated = true;
    next();
}