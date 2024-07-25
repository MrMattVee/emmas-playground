import React, { useState, useEffect } from 'react';

const colors = [
  { name: 'rouge', hex: '#FF6B6B' },
  { name: 'bleu', hex: '#4ECDC4' },
  { name: 'vert', hex: '#45B7D1' },
  { name: 'jaune', hex: '#F7DC6F' },
  { name: 'violet', hex: '#9B59B6' },
  { name: 'orange', hex: '#F39C12' },
  { name: 'rose', hex: '#FF69B4' },
  { name: 'marron', hex: '#8B4513' },
  { name: 'gris', hex: '#95A5A6' },
  { name: 'noir', hex: '#34495E' }
];

const ColorMatchingGame = () => {
  const [targetColor, setTargetColor] = useState({ name: '', hex: '' });
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const newTargetColor = colors[Math.floor(Math.random() * colors.length)];
    const newOptions = shuffleArray([...colors]).slice(0, 4);
    if (!newOptions.includes(newTargetColor)) {
      newOptions[Math.floor(Math.random() * 4)] = newTargetColor;
    }
    setTargetColor(newTargetColor);
    setOptions(newOptions);
    setMessage('');
    setShowCongrats(false);
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleColorClick = (color) => {
    if (color.name === targetColor.name) {
      setScore(prevScore => prevScore + 1);
      setMessage('Bravo Emma ! C\'est la bonne couleur !');
      setShowCongrats(true);
      setTimeout(() => {
        startNewRound();
      }, 2000);
    } else {
      setMessage('Essaie encore, Emma !');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#F0F4F8',
      padding: '2rem',
      fontFamily: '"Comic Sans MS", cursive, sans-serif',
    }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        color: '#4A4A4A',
        marginBottom: '2rem',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
      }}>
        Jeu des Couleurs d'Emma
      </h1>
      {showCongrats ? (
        <div style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#4CAF50',
          textAlign: 'center',
          margin: '2rem 0',
          animation: 'bounce 0.5s infinite alternate',
        }}>
          🎉 Félicitations Emma ! 🎉
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '2rem' }}>
            <div 
              style={{
                width: '10rem',
                height: '10rem',
                borderRadius: '50%',
                backgroundColor: targetColor.hex,
                margin: '0 auto 1rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            ></div>
            <p style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#4A4A4A',
            }}>
              Trouve cette couleur, Emma !
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            marginBottom: '2rem',
          }}>
            {options.map((color, index) => (
              <button
                key={index}
                onClick={() => handleColorClick(color)}
                style={{
                  width: '8rem',
                  height: '8rem',
                  borderRadius: '50%',
                  backgroundColor: color.hex,
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.1s, box-shadow 0.1s',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.95)';
                  e.currentTarget.style.boxShadow = '0 2px 3px rgba(0,0,0,0.1)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
              />
            ))}
          </div>
        </>
      )}
      <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4A4A4A' }}>Score: {score}</p>
      {message && <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#4A4A4A', marginTop: '1rem' }}>{message}</p>}
    </div>
  );
};

export default ColorMatchingGame;
