const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Alive", "Dead", "Unknown"],
        default: "Unknown"
    },
    species: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        required: true,
        enum: ["Female", "Male", "Genderless", "Unknown"]
    },
    origin: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Character", characterSchema);
