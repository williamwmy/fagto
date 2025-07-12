import type { WordData, GameState } from './types';

export const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const initializeGame = (playerCount: number, wordData: WordData): GameState => {
  const fakeArtistIndex = Math.floor(Math.random() * playerCount);
  const categories = Object.keys(wordData.categories);
  const selectedCategory = getRandomElement(categories);
  const selectedWord = getRandomElement(wordData.categories[selectedCategory]);

  return {
    playerCount,
    currentPlayer: 0,
    fakeArtistIndex,
    selectedCategory,
    selectedWord,
    phase: 'reveal'
  };
};

export const getPlayerInfo = (playerIndex: number, gameState: GameState) => {
  const isFakeArtist = playerIndex === gameState.fakeArtistIndex;
  return {
    index: playerIndex,
    isFakeArtist,
    word: isFakeArtist ? undefined : gameState.selectedWord
  };
};