import Menu from "../models/menu.model.js";
import Order from "../models/order.model.js";

export async function fetchOrder(req,res) {
    try {
        if(!req.isAuthenticated && !req.isAdmin){
            return res.status(400).json({success:false,message:"Unauthorized access"});
        }
        const orderItems = await Order.find();
        return res.status(200).json({success:true,message:"order fetched successfully",orderItems});
    } catch (error) {
        console.log(`Error while fetching orders: ${error}`);
        return res.status(500).json({success:false,message:error.message});
    }
}

export async function fetchUserOrders(req,res) {
    try {
        const { id } = req.params;
        if(!id || id.toString().length == 0){
            return res.status(400).json({success:false,message:"Must provide userId"});
        }
        if(!req.isAuthenticated){
            return res.status(400).json({success:false,message:"Unauthorized access"});
        }
        const orderItems = await Order.find({userId:id});
        return res.status(200).json({success:true,message:"order fetched successfully",orderItems});
    } catch (error) {
        console.log(`Error while fetching orders: ${error}`);
        return res.status(500).json({success:false,message:error.message});
    }
}

export async function createOrder(req,res) {
    try {
        if(!req.isAuthenticated){
            return res.status(400).json({success:false,message:"Unauthorized access"});
        }
        const {userId,items,totalAmount,status} = req.body;
        const newOrder = new Order({userId,items,totalAmount,status});
        await newOrder.save();
        return res.status(201).json({success:true,message:"order created successfully"});
    } catch (error) {
        console.log(`Error while creating new order: ${error.message}`);
        return res.status(500).json({success:false,message:error.message});
    }
}

export async function updateOrder(req, res) {
    try {
        if (!req.isAuthenticated && !req.isAdmin) {
            return res.status(400).json({ success: false, message: "Unauthorized access" });
        }

        const { id } = req.params; 
        const { userId, items, status } = req.body; 

        const existingOrder = await Order.findById(id);
        if (!existingOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        const populatedItems = await Promise.all(
            items.map(async (item) => {
                const menuItem = await Menu.findById(item.menuId);
                if (!menuItem) {
                    throw new Error(`Menu item with ID ${item.menuId} not found`);
                }
                return {
                    ...item,
                    menuPrice: menuItem.price,
                };
            })
        );

        const totalAmount = populatedItems.reduce((total, item) => {
            return total + item.menuPrice * item.quantity;
        }, 0);

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { userId, items, totalAmount, status },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Order updated successfully",
            order: updatedOrder,
        });
    } catch (error) {
        console.error(`Error while updating order: ${error.message}`);
        return res.status(500).json({ success: false, message: error.message });
    }
}
