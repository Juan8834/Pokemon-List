import React, { useState } from "react";

const Pokemon = ({ name, imageUrl, details }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleCardClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <div className="pokemon-container" onClick={handleCardClick}>
        <img src={imageUrl} alt={name} />
        <h3>{name}</h3>
      </div>

      {showPopup && (
        <div className="pokemon-popup">
          <div className="popup-content">
            <h2>{name}</h2>
            <img src={imageUrl} alt={name} />
            <p><strong>Height:</strong> {details.height}</p>
            <p><strong>Weight:</strong> {details.weight}</p>
            <p><strong>Base Experience:</strong> {details.base_experience}</p>
            <p><strong>Abilities:</strong> {details.abilities.map(ability => ability.ability.name).join(', ')}</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
