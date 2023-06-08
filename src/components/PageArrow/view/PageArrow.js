import React, { useState } from 'react';
import '../styles/page-arrow.scss'; // Importe o arquivo CSS com as classes correspondentes

function PageArrow() {
  const [isBouncing, setIsBouncing] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBouncing(!isBouncing);
  };

  return (
    <div className="center-con">

      <div className="round" onClick={handleClick}>
        <p>Meus servi&#xe7;os</p>
        <div id="cta">
          <span className={`arrow primera next ${isBouncing ? 'bounceAlpha' : ''}`}></span>
          <span className={`arrow segunda next ${isBouncing ? 'bounceAlpha' : ''}`}></span>
        </div>
      </div>
    </div>
  );
}

export default PageArrow;
