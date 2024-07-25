import React from 'react';

const games = [
  { id: 'colors', name: 'Jeu des Couleurs', icon: '🎨' },
  { id: 'shapes', name: 'Jeu des Formes', icon: '🔷' },
  { id: 'animals', name: 'Jeu des Animaux', icon: '🐘' },
];

const EmmasPlaygroundHub = ({ onGameSelect }) => {
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
        fontSize: '3.5rem',
        fontWeight: 'bold',
        color: '#4A4A4A',
        textAlign: 'center',
        marginBottom: '3rem',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
      }}>
        La Salle de Jeux d'Emma
      </h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        width: '100%',
        maxWidth: '800px',
      }}>
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => onGameSelect(game.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
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
            <span style={{ fontSize: '4rem', marginBottom: '1rem' }}>{game.icon}</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4A4A4A', textAlign: 'center' }}>{game.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmmasPlaygroundHub;
