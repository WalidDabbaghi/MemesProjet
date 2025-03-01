const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Config/cloudinary");

// Configuration du stockage sur Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "memes", // Nom du dossier dans Cloudinary
    format: async (req, file) => "png", // Format de sortie
    public_id: (req, file) => Date.now() + "-" + file.originalname, // Nom unique
  },
});

const upload = multer({ storage });

module.exports = upload;
