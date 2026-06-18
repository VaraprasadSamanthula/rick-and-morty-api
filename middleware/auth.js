const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "rickandmorty_secret_key_2024";

exports.protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized to access this route. Please login."
            });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "User not found"
                });
            }

            next();
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid or expired"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Authentication error",
            error: error.message
        });
    }
};

module.exports.JWT_SECRET = JWT_SECRET;
