import React, { useState, useEffect } from 'react';

const animals = [
  { name: 'chien', emoji: '🐶' },
  { name: 'chat', emoji: '🐱' },
  { name: 'éléphant', emoji: '🐘' },
  { name: 'lion', emoji: '🦁' },
  { name: 'singe', emoji: '🐵' },
  { name: 'girafe', emoji: '🦒' },
  { name: 'hibou', emoji: '🦉' },
  { name: 'pingouin', emoji: '🐧' },
  { name: 'poisson', emoji: '🐠' },
  { name: 'tortue', emoji: '🐢' },
];

const AnimalMatchingGame = () => {
  const [targetAnimal, setTargetAnimal] = useState({ name: '', emoji: '' });
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [showCongrats, setShowCongrats] = useState(false);

  const startNewRound = () => {
    const newTargetAnimal = animals[Math.floor(Math.random() * animals.length)];
    const newOptions = shuffleArray([...animals]).slice(0, 4);
    if (!newOptions.includes(newTargetAnimal)) {
      newOptions[Math.floor(Math.random() * 4)] = newTargetAnimal;
    }
    setTargetAnimal(newTargetAnimal);
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

  const handleAnimalClick = (animal) => {
    if (animal.name === targetAnimal.name) {
      setScore(prevScore => prevScore + 1);
      setMessage('Bravo Emma ! C\'est le bon animal !');
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
        Jeu des Animaux d'Emma
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
          <div style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#4A4A4A',
            marginBottom: '2rem',
            padding: '1rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '15px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}>
            {targetAnimal.name}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            marginBottom: '2rem',
          }}>
            {options.map((animal, index) => (
              <button
                key={index}
                onClick={() => handleAnimalClick(animal)}
                style={{
                  width: '8rem',
                  height: '8rem',
                  fontSize: '4rem',
                  backgroundColor: '#FFFFFF',
                  border: 'none',
                  borderRadius: '15px',
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
              >
                {animal.emoji}
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

export default AnimalMatchingGame;
