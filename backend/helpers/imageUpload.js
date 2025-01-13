import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from "dotenv";

dotenv.config();
// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,     
    api_secret: process.env.CLOUDINARY_API_SECRET, 
});

// Multer Storage Setup
const storage = new CloudinaryStorage({
    cloudinary: cloudinary, 
    params: {
        folder: 'menu_items',
        allowed_formats: ['jpg', 'png'], 
    },
});

export const upload = multer({ storage });
