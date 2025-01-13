import { Router } from "express";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import { createMenu, deleteMenu, fetchMenu, updateMenu } from "../controllers/menu.controller.js";
import { upload } from "../helpers/imageUpload.js";

const menuRouter = Router();
menuRouter.get("/",fetchMenu);
menuRouter.post("/",upload.single('image'),protectedRoute,createMenu);
menuRouter.put("/:id",upload.single('image'),protectedRoute,updateMenu);
menuRouter.delete("/:id",protectedRoute,deleteMenu);

export default menuRouter;