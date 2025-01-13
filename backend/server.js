import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import menuRouter from "./routes/menu.route.js";
import orderRouter from "./routes/order.route.js";
import cors from "cors";

const app = express();

//CONFIG
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://full-stack-task-management-app-kf8h.vercel.app", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies or credentials
}));
app.use(express.urlencoded({ extended: true }));

//ENV
const port = process.env.PORT;
const mongodbURI = process.env.MONGODB_URI;

app.get("/",(req,res)=>{
    res.json({success:true,
        APIEndPoints:{
            "to login user (POST)":"https://api-full-stack-task-management.vercel.app/user/login",
            "to register user (POST)":"https://api-full-stack-task-management.vercel.app/user/register",
            "to create menu (POST)":"https://api-full-stack-task-management.vercel.app/menu",
            "to fetch all menu (GET)":"https://api-full-stack-task-management.vercel.app/menu",
            "to update menu (PUT)":"https://api-full-stack-task-management.vercel.app/menu/id",
            "to delete menu (DELETE)":"https://api-full-stack-task-management.vercel.app/menu/id",
            "to create order (POST)":"https://api-full-stack-task-management.vercel.app/order",
            "to update order (PUT)":"https://api-full-stack-task-management.vercel.app/order/id",
            "to fetch single user order (GET)":"https://api-full-stack-task-management.vercel.app/user/order/id",
            "to fetch all orders (GET)":"https://api-full-stack-task-management.vercel.app/order"
        }
    });
})
app.use("/user",userRouter);
app.use("/menu",menuRouter);
app.use("/order",orderRouter);

mongoose
  .connect(mongodbURI)
  .then(() => {
    console.log("Databse connected!!!");
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error while connecting to database!");
    console.log(error)
  });

