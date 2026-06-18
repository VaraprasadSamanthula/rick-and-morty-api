const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://varaprasadsamanthula8334_db_user:Pikachu@cluster0.vy6upc9.mongodb.net/rickandmorty?appName=Cluster0");
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

module.exports = connectDb;
