import mongoose from "mongoose";

export const menuSchema = new mongoose.Schema({
    image:{
        type:String,
        required:[true,"menu item must have a image"]
    },
    name:{
        type:String,
        required:[true,"menu item must have a name"]
    },
    category:{
        type:String,
        required:[true,"menu item must have a category"]
    },
    price:{
        type:Number,
        required:[true,"menu item must have a price"]
    },
    availability:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

const Menu = mongoose.model("Menu",menuSchema);

export default Menu;