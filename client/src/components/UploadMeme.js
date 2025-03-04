import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const UploadMeme = ({ onUploadSuccess }) => {
  const [texts, setTexts] = useState([]); // Liste des textes
  const [currentText, setCurrentText] = useState(""); // Texte en cours d'ajout
  const [textAngle, setTextAngle] = useState(""); // ✅ Angle sans valeur par défaut
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null); // ✅ Référence pour l'input file
  
  useEffect(() => {
    if (imagePreview) {
      drawMeme();
    }
  }, [imagePreview, texts]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (currentText.trim() !== "") {
      setTexts([...texts, { text: currentText, x, y, angle: textAngle || 0 }]); // 🔥 Ajoute l'angle uniquement si renseigné
      setCurrentText(""); 
      setTextAngle(""); // ✅ Réinitialiser après ajout
    }
  };

  const drawMeme = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imagePreview;

    img.onload = () => {
      canvas.width = img.width / 2;
      canvas.height = img.height / 2;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      ctx.font = "30px Impact";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      texts.forEach(({ text, x, y, angle }) => {
        ctx.save(); // 🔥 Sauvegarde l’état du canvas
        ctx.translate(x, y); // 🔥 Déplace le point d'origine
        ctx.rotate((angle * Math.PI) / 180); // 🔥 Applique la rotation en radians
        ctx.fillText(text, 0, 0);
        ctx.strokeText(text, 0, 0);
        ctx.restore(); // 🔥 Restaure l’état initial du canvas
      });
    };
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Veuillez sélectionner une image !");
      return;
    }

    setUploading(true);

    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    const blob = await fetch(dataUrl).then((res) => res.blob());
    const formData = new FormData();
    formData.append("image", blob, "meme.png");
    formData.append("texts", JSON.stringify(texts));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/memes/test",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Meme uploaded:", response.data);

      if (response.data && response.data.imageUrl) {
        onUploadSuccess({
          _id: response.data._id,
          imageUrl: response.data.imageUrl,
          texts,
        });
      }

      // ✅ Réinitialiser l’input file après l’upload
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setImage(null);
      setImagePreview(null);
      setTexts([]);
      setTextAngle(""); // ✅ Réinitialiser après l’upload
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Uploader un Mème</h2>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef} // ✅ Ajout de la référence
        onChange={handleImageChange}
      />
      <input
        type="text"
        placeholder="Écrire un texte..."
        value={currentText}
        onChange={(e) => setCurrentText(e.target.value)}
      />
      <input
        type="number"
        placeholder="Angle (°)"
        value={textAngle}
        onChange={(e) => setTextAngle(e.target.value)}
      />
      <p>💡 Clique sur l’image pour positionner le texte</p>

      {imagePreview && (
        <div>
          <h3>Aperçu du Mème</h3>
          <canvas ref={canvasRef} onClick={handleCanvasClick} />
        </div>
      )}

      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Uploader"}
      </button>
    </div>
  );
};

export default UploadMeme;
