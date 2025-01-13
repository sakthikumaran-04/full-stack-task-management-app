import { Router } from "express";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import { createOrder, updateOrder, fetchOrder, fetchUserOrders } from "../controllers/order.controller.js";

const orderRouter = Router();
orderRouter.post("/",protectedRoute,createOrder);
orderRouter.put("/:id",protectedRoute,updateOrder);
orderRouter.get("/user/:id",protectedRoute,fetchUserOrders);
orderRouter.get("/",protectedRoute,fetchOrder)

export default orderRouter;