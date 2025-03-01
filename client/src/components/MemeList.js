import React, { useEffect, useState } from "react";
import "../styles/MemeList.css"; // Assurez-vous que le fichier CSS est bien importé
import { FaDownload } from "react-icons/fa"; // Import de l'icône

const MemeList = ({ memes }) => {
  const [displayedMemes, setDisplayedMemes] = useState([]);

  useEffect(() => {
    console.log("Mèmes mis à jour :", memes);
    setDisplayedMemes(memes);
  }, [memes]);

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "meme.png"; // Nom du fichier
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      // Libérer l'URL Blob après le téléchargement
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Erreur lors du téléchargement :", error);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Liste des Mèmes</h2>
      <div className="meme-container">
        {displayedMemes.map((meme) => (
          <div key={meme._id} className="meme-card">
            <div className="download-icon" onClick={() => handleDownload(meme.imageUrl)}>
              <FaDownload />
            </div>
            <img src={meme.imageUrl} alt="Meme" />
            <p className="meme-text">{meme.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemeList;
