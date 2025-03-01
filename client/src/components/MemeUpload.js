import React, { useState } from "react";

function MemeUpload({ onImageUpload }) {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Sélectionne une image d'abord !");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/api/memes/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.imageUrl) {
        onImageUpload(data.imageUrl);
      }
    } catch (error) {
      console.error("Erreur d'upload :", error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default MemeUpload;
