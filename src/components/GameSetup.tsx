import React, { useState } from 'react';
import './GameSetup.css';
import packageJson from '../../package.json';

interface GameSetupProps {
  onStartGame: (playerCount: number) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
  const [playerCount, setPlayerCount] = useState(5);

  const handleStartGame = () => {
    onStartGame(playerCount);
  };

  return (
    <div className="game-setup">
      <h1 className="title">Fake Artist Goes to Oslo</h1>
      
      <div className="player-selection">
        <h2>Hvor mange spillere?</h2>
        <div className="player-buttons">
          {[5, 6, 7, 8, 9, 10].map(count => (
            <button
              key={count}
              className={`player-btn ${playerCount === count ? 'active' : ''}`}
              onClick={() => setPlayerCount(count)}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      <button className="start-btn" onClick={handleStartGame}>
        Start spill
      </button>
      
      <div className="version-info">
        v{packageJson.version}
      </div>
    </div>
  );
};

export default GameSetup;