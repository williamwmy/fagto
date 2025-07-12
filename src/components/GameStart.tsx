import React from 'react';
import './GameStart.css';

interface GameStartProps {
  category: string;
  onNewGame: () => void;
}

const GameStart: React.FC<GameStartProps> = ({ category, onNewGame }) => {
  return (
    <div className="game-start">
      <div className="instruction-card">
        <h1>Alle har nå sett sin rolle!</h1>
        
        <div className="category-display">
          <p>Kategori:</p>
          <h2>{category}</h2>
        </div>
        
        <div className="drawing-instruction">
          <h3>🎨 Begynn å tegne! 🎨</h3>
          <ul>
            <li>Tegn på tur rundt bordet</li>
            <li>Hver spiller tegner én strek eller form</li>
            <li>Prøv å gjette hvem som er den falske kunstneren</li>
          </ul>
        </div>
        
        <button className="new-game-btn" onClick={onNewGame}>
          Start ny runde
        </button>
      </div>
    </div>
  );
};

export default GameStart;