export interface WordData {
  categories: {
    [categoryName: string]: string[];
  };
}

export interface GameState {
  playerCount: number;
  currentPlayer: number;
  fakeArtistIndex: number;
  selectedCategory: string;
  selectedWord: string;
  phase: 'setup' | 'reveal' | 'drawing' | 'finished';
}

export interface Player {
  index: number;
  isFakeArtist: boolean;
  word?: string;
}