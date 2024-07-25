import React, { useState, Suspense, lazy } from 'react';
import ErrorBoundary from './components/ErrorBoundary';

const EmmasPlaygroundHub = lazy(() => import('./components/EmmasPlaygroundHub'));
const ColorMatchingGame = lazy(() => import('./components/ColorMatchingGame'));
const ShapeMatchingGame = lazy(() => import('./components/ShapeMatchingGame'));
const AnimalMatchingGame = lazy(() => import('./components/AnimalMatchingGame'));

function App() {
  const [currentGame, setCurrentGame] = useState(null);

  const renderGame = () => {
    switch (currentGame) {
      case 'colors':
        return <ColorMatchingGame onBack={() => setCurrentGame(null)} />;
      case 'shapes':
        return <ShapeMatchingGame onBack={() => setCurrentGame(null)} />;
      case 'animals':
        return <AnimalMatchingGame onBack={() => setCurrentGame(null)} />;
      default:
        return <EmmasPlaygroundHub onGameSelect={setCurrentGame} />;
    }
  };

  return (
    <div className="App">
      <ErrorBoundary>
        <Suspense fallback={<div>Chargement...</div>}>
          {renderGame()}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
