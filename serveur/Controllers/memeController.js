const Meme = require("../Models/Meme");

// Ajouter un mème avec image et plusieurs textes
const createMeme = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : null; // URL Cloudinary
    const { texts } = req.body; // Récupération des textes envoyés en JSON

    if (!imageUrl) {
      return res.status(400).json({ error: "Aucune image fournie" });
    }

    // 🔥 Convertir `texts` (string) en tableau JSON
    const parsedTexts = texts ? JSON.parse(texts) : [];

    const newMeme = new Meme({ imageUrl, texts: parsedTexts });
    await newMeme.save();
    res.status(201).json(newMeme);
  } catch (error) {
    console.error("Erreur lors de la création du mème :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Récupérer tous les mèmes
const getMemes = async (req, res) => {
  try {
    const memes = await Meme.find().sort({ createdAt: -1 });
    res.status(200).json(memes);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des mèmes" });
  }
};

module.exports = { createMeme, getMemes };
