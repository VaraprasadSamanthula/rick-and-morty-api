const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "duab1yg3v",
    api_key: process.env.CLOUDINARY_API_KEY || "887866557842841",
    api_secret: process.env.CLOUDINARY_API_SECRET || "Yf93ID5GJsFMasMqoZCEPpwydAY"
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "rick-and-morty-characters",
        allowed_formats: ["jpg", "jpeg", "png", "gif"],
        transformation: [{ width: 500, height: 500, crop: "limit" }]
    }
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
