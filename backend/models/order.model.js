import mongoose from "mongoose";
import { menuSchema } from "./menu.model.js";

const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:[true,"order must have a userId"]
    },
    items:{
        type:[
            {
                id:{
                    type:mongoose.Types.ObjectId,
                    required:[true,"order must have a id"]
                },
                image:{
                    type:String,
                    required:[true,"order must have a image"]
                },
                name:{
                    type:String,
                    required:[true,"order must have a name"]
                },
                category:{
                    type:String,
                    required:[true,"order must have a category"]
                },
                price:{
                    type:Number,
                    required:[true,"order must have a price"]
                },
                quantity:{
                    type:Number,
                    min:[1,"menu item must have atleat 1 quantity"]
            }
        }],
    },
    totalAmount:{
        type: Number,
        required: true,
        default: 0
    },
    status:{
        type:String,
        enum:["pending","completed"],
        default:"pending"
    }
},{ timestamps : true})


const Order = mongoose.model("Order",orderSchema);

export default Order;