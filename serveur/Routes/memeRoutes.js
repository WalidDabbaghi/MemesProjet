const express = require("express");
const { createMeme, getMemes, getUserMemes, getMemesByUserId } = require("../Controllers/memeController");
const upload = require("../Middleware/upload");
const isAuth = require("../Middleware/passport");

const router = express.Router();

router.post("/memes",isAuth(), upload.single("image"), createMeme);
router.post("/memes/test", upload.single("image"), createMeme);
router.get("/memes", getMemes);
router.get("/memes/user", isAuth(), getUserMemes);
router.get("/m/:userId", getMemesByUserId);
module.exports = router;
