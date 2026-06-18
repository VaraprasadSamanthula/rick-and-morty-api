const Character = require("../models/Character");

exports.createCharacter = async (req, res) => {
    try {
        const { name, status, species, type, gender, origin, location } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a character image"
            });
        }

        const character = await Character.create({
            name,
            status,
            species,
            type,
            gender,
            origin,
            location,
            image: req.file.path,
            createdBy: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Character created successfully",
            character
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error creating character",
            error: err.message
        });
    }
};

exports.getAllCharacters = async (req, res) => {
    try {
        const characters = await Character.find()
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: characters.length,
            characters
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching characters",
            error: err.message
        });
    }
};

exports.getCharacterById = async (req, res) => {
    try {
        const character = await Character.findById(req.params.id)
            .populate("createdBy", "name email");

        if (!character) {
            return res.status(404).json({
                success: false,
                message: "Character not found"
            });
        }

        res.status(200).json({
            success: true,
            character
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching character",
            error: err.message
        });
    }
};

exports.updateCharacter = async (req, res) => {
    try {
        let character = await Character.findById(req.params.id);

        if (!character) {
            return res.status(404).json({
                success: false,
                message: "Character not found"
            });
        }

        if (character.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to update this character"
            });
        }

        if (req.file) {
            req.body.image = req.file.path;
        }

        character = await Character.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Character updated successfully",
            character
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error updating character",
            error: err.message
        });
    }
};

exports.deleteCharacter = async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);

        if (!character) {
            return res.status(404).json({
                success: false,
                message: "Character not found"
            });
        }

        if (character.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this character"
            });
        }

        await Character.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Character deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error deleting character",
            error: err.message
        });
    }
};

exports.getCharactersByStatus = async (req, res) => {
    try {
        const { status } = req.params;

        const characters = await Character.find({ status })
            .populate("createdBy", "name email");

        res.status(200).json({
            success: true,
            count: characters.length,
            characters
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching characters",
            error: err.message
        });
    }
};
