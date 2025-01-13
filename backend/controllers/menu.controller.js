import Menu from "../models/menu.model.js";

export async function fetchMenu(req,res) {
    try {
        const menuItems = await Menu.find();
        return res.status(200).json({success:true,message:"menu fetched successfully",menuItems});
    } catch (error) {
        console.log(`Error while fetching menu: ${error}`);
        return res.status(500).json({success:false,message:error.message});
    }
}

export async function createMenu(req, res) {
    try {
        if (!req.isAuthenticated || !req.isAdmin) {
            return res.status(403).json({ success: false, message: 'Unauthorized access' });
        }

        const { name, category, price, availability } = req.body;
        if (!name || !category || price === undefined || availability === undefined) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        let imageUrl = '';
        if (req.file) {
            imageUrl = req.file.path; 
        } else {
            return res.status(400).json({ success: false, message: 'Image is required' });
        }

        const newItem = new Menu({ name, category, price, availability, image: imageUrl });
        await newItem.save();

        return res.status(201).json({
            success: true,
            message: 'Menu item created successfully',
            item: newItem,
        });
    } catch (error) {
        console.error(`Error while creating menu item: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
}


export async function updateMenu(req, res) {
    try {
        if (!req.isAuthenticated || !req.isAdmin) {
            return res.status(403).json({ success: false, message: 'Unauthorized access' });
        }

        const { id } = req.params;
        const { name, category, price, availability } = req.body;

        let imageUrl = undefined;
        if (req.file) {
            imageUrl = req.file.path; 
        }

        // Update menu item
        const updatedFields = { name, category, price, availability };
        if (imageUrl) updatedFields.image = imageUrl;

        const updatedItem = await Menu.findByIdAndUpdate(id, updatedFields, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Menu item updated successfully',
            item: updatedItem,
        });
    } catch (error) {
        console.error(`Error while updating menu item: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
}


export async function deleteMenu(req,res) {
    try {
        if(!req.isAuthenticated && !req.isAdmin){
            return res.status(400).json({success:false,message:"unauthorized access"});
        }
        const { id } = req.params;
        const deletedItem = await Menu.findByIdAndDelete(id);
        if(!deletedItem){
            return res.status(404).json({ success: false, message: "Menu item not found" });
        }
        return res.status(200).json({ success: true, message: "Menu item deleted successfully" });

    } catch (error) {
        console.log(`Error while deleting menu item: ${error.message}`);
        return res.status(500).json({ success: false, message: error.message});
    }
}