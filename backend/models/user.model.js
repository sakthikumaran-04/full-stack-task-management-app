import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

userSchema.pre("save",async function (next) {
    if (!this.isModified("password"))
        return;
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(this.password,salt);
    this.password = hashedPassword;
    next();
})

const User = mongoose.model("User",userSchema);

export default User;