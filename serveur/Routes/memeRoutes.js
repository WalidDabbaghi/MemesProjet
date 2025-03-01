const express = require("express");
const { createMeme, getMemes } = require("../Controllers/memeController");
const upload = require("../Middleware/upload");

const router = express.Router();

router.post("/memes", upload.single("image"), createMeme);
router.get("/memes", getMemes);
module.exports = router;
