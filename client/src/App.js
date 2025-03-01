import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadMeme from "./components/UploadMeme";
import MemeList from "./components/MemeList";

function App() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/memes");
      setMemes(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des mèmes:", error);
    }
  };

  // ✅ 🔥 Ajoute le mème immédiatement après l'upload
  const handleUploadSuccess = (newMeme) => {
    setMemes((prevMemes) => {
      const updatedMemes = [newMeme, ...prevMemes];
      console.log("Liste des mèmes mise à jour:", updatedMemes);
      return updatedMemes;
    });
  };
  

  return (
    <div>
      <h1>Générateur de Mèmes</h1>
      <UploadMeme onUploadSuccess={handleUploadSuccess} />
      <MemeList key={memes.length} memes={memes} />
    </div>
  );
}

export default App;
