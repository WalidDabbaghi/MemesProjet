import React, { useState, useEffect } from "react";

const Gallery = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/memes")
      .then((response) => response.json())
      .then((data) => setMemes(data));
  }, []);

  return (
    <div>
      <h1>Galerie des Mèmes</h1>
      <div>
        {memes.map((meme) => (
          <div key={meme._id} style={{ textAlign: "center", marginBottom: "20px" }}>
            <img src={meme.imageUrl} alt="Meme" style={{ width: "300px" }} />
            <p><strong>Haut :</strong> {meme.topText}</p>
            <p><strong>Bas :</strong> {meme.bottomText}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
