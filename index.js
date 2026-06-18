const express = require("express");
const connectDb = require("./config/db");
const authRouter = require("./router/authRouter");
const characterRouter = require("./router/characterRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

app.use("/api/auth", authRouter);
app.use("/api", characterRouter);

app.get("/", (req, res) => {
    res.json({
        message: "Rick & Morty Character Management API",
        endpoints: {
            auth: {
                register: "POST /api/auth/register",
                login: "POST /api/auth/login",
                getMe: "GET /api/auth/me (Protected)"
            },
            characters: {
                getAll: "GET /api/characters",
                getById: "GET /api/characters/:id",
                getByStatus: "GET /api/characters/status/:status",
                create: "POST /api/characters (Protected, with image)",
                update: "PUT /api/characters/:id (Protected)",
                delete: "DELETE /api/characters/:id (Protected)"
            }
        }
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong!",
        error: err.message
    });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`🚀 Rick & Morty API server running on port ${PORT}`);
});
