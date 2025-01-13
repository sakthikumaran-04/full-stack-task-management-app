import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.SECRET;

export function createToken(userId){
    if(!userId.toString().trim()) return false;
    const token = jwt.sign({userId},secret);
    return token;
}

export function verifyToken(token){
    try {
        if(!token.toString().trim()) return false;
        const decoded = jwt.verify(token,secret);
        return decoded;
    } catch (error) {
        return false;
    }
}