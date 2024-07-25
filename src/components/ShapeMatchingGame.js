import React, { useState, useEffect } from 'react';

const shapes = [
  { name: 'cercle', svg: (color) => <circle cx="50" cy="50" r="45" fill={color} /> },
  { name: 'carré', svg: (color) => <rect x="5" y="5" width="90" height="90" fill={color} /> },
  { name: 'triangle', svg: (color) => <polygon points="50,5 95,95 5,95" fill={color} /> },
  { name: 'étoile', svg: (color) => <path d="M50,5 L61,40 98,40 68,62 79,95 50,75 21,95 32,62 2,40 39,40 Z" fill={color} /> },
  { name: 'coeur', svg: (color) => <path d="M50,30 A20,20,0,0,1,90,30 A20,20,0,0,1,50,70 A20,20,0,0,1,10,30 A20,20,0,0,1,50,30 Z" fill={color} /> },
  { name: 'losange', svg: (color) => <polygon points="50,5 95,50 50,95 5,50" fill={color} /> }
];

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];

const ShapeMatchingGame = () => {
  const [targetShape, setTargetShape] = useState({ name: '', svg: null, color: '' });
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [showCongrats, setShowCongrats] = useState(false);

  const startNewRound = () => {
    const newTargetShape = shapes[Math.floor(Math.random() * shapes.length)];
    const newTargetColor = colors[Math.floor(Math.random() * colors.length)];
    const newOptions = shuffleArray([...shapes]).slice(0, 4).map(shape => ({
      ...shape,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    if (!newOptions.some(option => option.name === newTargetShape.name)) {
      newOptions[Math.floor(Math.random() * 4)] = { ...newTargetShape, color: newTargetColor };
    }
    setTargetShape({ ...newTargetShape, color: newTargetColor });
    setOptions(newOptions);
    setMessage('');
    setShowCongrats(false);
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleShapeClick = (shape) => {
    if (shape.name === targetShape.name) {
      setScore(prevScore => prevScore + 1);
      setMessage('Bravo Emma ! C\'est la bonne forme !');
      setShowCongrats(true);
      setTimeout(startNewRound, 2000);
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
        Jeu des Formes d'Emma
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
            <svg width="150" height="150" viewBox="0 0 100 100" style={{ display: 'block', margin: '0 auto 1rem' }}>
              {targetShape.svg && targetShape.svg(targetShape.color)}
            </svg>
            <p style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#4A4A4A',
            }}>
              Trouve cette forme, Emma !
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            marginBottom: '2rem',
          }}>
            {options.map((shape, index) => (
              <button
                key={index}
                onClick={() => handleShapeClick(shape)}
                style={{
                  width: '8rem',
                  height: '8rem',
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '15px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.1s, box-shadow 0.1s',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
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
              >
                <svg width="80" height="80" viewBox="0 0 100 100">
                  {shape.svg(shape.color)}
                </svg>
              </button>
            ))}
          </div>
        </>
      )}
      <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4A4A4A' }}>Score: {score}</p>
      {message && <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#4A4A4A', marginTop: '1rem' }}>{message}</p>}
    </div>
  );
};

export default ShapeMatchingGame;
