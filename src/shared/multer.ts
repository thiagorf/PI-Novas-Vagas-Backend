import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_KEY_SECRECT,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
});

const upload = multer({ storage: storage });

export default upload;
