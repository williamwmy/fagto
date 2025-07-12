import { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import GameSetup from './components/GameSetup';
import PlayerReveal from './components/PlayerReveal';
import GameStart from './components/GameStart';
import type { WordData, GameState } from './types';
import { initializeGame, getPlayerInfo } from './gameLogic';
import './App.css';

function App() {
  const [wordData, setWordData] = useState<WordData | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWordData = async () => {
      try {
        const response = await fetch('/words.yaml');
        const yamlText = await response.text();
        const data = yaml.load(yamlText) as WordData;
        setWordData(data);
      } catch (error) {
        console.error('Feil ved lasting av orddata:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWordData();
  }, []);

  const handleStartGame = (playerCount: number) => {
    if (wordData) {
      const newGameState = initializeGame(playerCount, wordData);
      setGameState(newGameState);
    }
  };

  const handleNextPlayer = () => {
    if (gameState) {
      if (gameState.currentPlayer < gameState.playerCount - 1) {
        setGameState({
          ...gameState,
          currentPlayer: gameState.currentPlayer + 1
        });
      } else {
        setGameState({
          ...gameState,
          phase: 'drawing'
        });
      }
    }
  };

  const handleNewGame = () => {
    setGameState(null);
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Laster spill...</h2>
      </div>
    );
  }

  if (!wordData) {
    return (
      <div className="error">
        <h2>Feil ved lasting av orddata</h2>
        <p>Kunne ikke laste ordene for spillet.</p>
      </div>
    );
  }

  if (!gameState) {
    return <GameSetup onStartGame={handleStartGame} />;
  }

  if (gameState.phase === 'reveal') {
    const currentPlayerInfo = getPlayerInfo(gameState.currentPlayer, gameState);
    return (
      <PlayerReveal
        player={currentPlayerInfo}
        playerNumber={gameState.currentPlayer + 1}
        totalPlayers={gameState.playerCount}
        category={gameState.selectedCategory}
        onNextPlayer={handleNextPlayer}
      />
    );
  }

  if (gameState.phase === 'drawing') {
    return (
      <GameStart
        category={gameState.selectedCategory}
        onNewGame={handleNewGame}
      />
    );
  }

  return null;
}

export default App;