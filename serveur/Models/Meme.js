const mongoose = require("mongoose");

const memeSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true }, // Lien de l'image
  texts: [
    {
      text: { type: String, required: true }, // Contenu du texte
      x: { type: Number, required: true }, // Position X
      y: { type: Number, required: true }, // Position Y
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // Référence à l'utilisateur
  createdAt: { type: Date, default: Date.now } // Date de création
});

module.exports = mongoose.model("Meme", memeSchema);
