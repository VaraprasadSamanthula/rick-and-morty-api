const express = require("express");
const router = express.Router();
const {
    createCharacter,
    getAllCharacters,
    getCharacterById,
    updateCharacter,
    deleteCharacter,
    getCharactersByStatus
} = require("../controller/characterController");
const { protect } = require("../middleware/auth");
const { upload } = require("../config/cloudinary");

router.get("/characters", getAllCharacters);
router.get("/characters/:id", getCharacterById);
router.get("/characters/status/:status", getCharactersByStatus);
router.post("/characters", protect, upload.single("image"), createCharacter);
router.put("/characters/:id", protect, upload.single("image"), updateCharacter);
router.delete("/characters/:id", protect, deleteCharacter);

module.exports = router;
