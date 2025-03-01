import React, { useRef, useState } from "react";

const MemeEditor = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const canvasRef = useRef(null);

  // Charger l'image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Dessiner le mème
  const drawMeme = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = image;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);
      ctx.font = "40px Impact";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(text, canvas.width / 2, canvas.height - 20);
    };
  };

  // Télécharger le mème
  const downloadMeme = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Créer un Mème</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <input
        type="text"
        placeholder="Texte du mème"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={drawMeme}>Générer Mème</button>
      <button onClick={downloadMeme}>Télécharger</button>
      <canvas ref={canvasRef} style={{ border: "1px solid black", marginTop: "10px" }} />
    </div>
  );
};

export default MemeEditor;
