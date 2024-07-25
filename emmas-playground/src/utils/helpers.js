// Shuffle an array (Fisher-Yates algorithm)
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Play a sound
export const playSound = (soundUrl) => {
  const audio = new Audio(soundUrl);
  audio.play().catch(error => console.error('Error playing sound:', error));
};

// Generate a random color
export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Format score with leading zeros
export const formatScore = (score) => {
  return score.toString().padStart(3, '0');
};
