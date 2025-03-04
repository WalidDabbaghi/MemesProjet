const Meme = require("../Models/Meme");

// Ajouter un mème avec image et plusieurs textes, lié à l'utilisateur
const createMeme = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : null;
    const { texts } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Aucune image fournie" });
    }

    const parsedTexts = texts ? JSON.parse(texts) : [];

    const newMeme = new Meme({
      imageUrl,
      texts: parsedTexts,
      user: req.user ? req.user.id : null, // ✅ Associer un utilisateur si authentifié
    });

    await newMeme.save();
    res.status(201).json(newMeme);
  } catch (error) {
    console.error("Erreur lors de la création du mème :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Récupérer tous les mèmes (optionnellement avec info utilisateur)
const getMemes = async (req, res) => {
  try {
    const memes = await Meme.find().sort({ createdAt: -1 });
    res.status(200).json(memes);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des mèmes" });
  }
};

// Récupérer les mèmes d'un utilisateur connecté
const getUserMemes = async (req, res) => {
  console.log("🔍 Utilisateur dans la requête :", req.user);

  if (!req.user) {
      return res.status(401).json({ message: "⚠️ Non autorisé. Token invalide ou utilisateur non trouvé." });
  }

  try {
      const memes = await Meme.find({ user: req.user._id });

      console.log("📸 Mèmes récupérés:", memes);
      res.json(memes);
  } catch (err) {
      console.error("❌ Erreur lors de la récupération des mèmes:", err.message);
      res.status(500).json({ message: "Erreur serveur" });
  }
};

const getMemesByUserId = async (req, res) => {
  try {
      const { userId } = req.params;
      console.log("UserID reçu :", userId);

      const memes = await Meme.find({ user: userId });

      if (!memes.length) {
          return res.status(404).json({ message: "Aucun mème trouvé pour cet utilisateur" });
      }

      res.json(memes);
  } catch (error) {
      console.error("Erreur serveur :", error);
      res.status(500).json({ message: "Erreur serveur" });
  }
};
module.exports = { createMeme, getMemes, getUserMemes , getMemesByUserId};
