import React, { useState } from 'react';
import type { Player } from '../types';
import './PlayerReveal.css';

interface PlayerRevealProps {
  player: Player;
  playerNumber: number;
  totalPlayers: number;
  category: string;
  onNextPlayer: () => void;
}

const PlayerReveal: React.FC<PlayerRevealProps> = ({ 
  player, 
  playerNumber, 
  totalPlayers, 
  category,
  onNextPlayer 
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState<number | null>(null);

  const handleTouchStart = () => {
    setTouchStartTime(Date.now());
    setIsRevealed(true);
  };

  const handleTouchEnd = () => {
    if (touchStartTime && Date.now() - touchStartTime > 500) {
      setIsRevealed(false);
      setTouchStartTime(null);
      setTimeout(() => {
        onNextPlayer();
      }, 1000);
    } else {
      setIsRevealed(false);
      setTouchStartTime(null);
    }
  };

  const handleMouseDown = () => {
    setIsRevealed(true);
  };

  const handleMouseUp = () => {
    setIsRevealed(false);
    setTimeout(() => {
      onNextPlayer();
    }, 1000);
  };

  // Dynamic font size based on word length
  const getWordFontSize = (word: string) => {
    if (word.length <= 4) return '3rem';
    if (word.length <= 6) return '2.5rem';
    if (word.length <= 8) return '2rem';
    return '1.6rem';
  };

  return (
    <div className="player-reveal">
      <div className="player-info">
        <h2>Spiller {playerNumber} av {totalPlayers}</h2>
        <p className="category">Kategori: {category}</p>
      </div>

      <div className="instruction-outside">
        <p>Hold fingeren på boksen for å se din rolle</p>
      </div>

      <div 
        className={`reveal-area ${isRevealed ? 'revealed' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {isRevealed && (
          <div className="role-display">
            {player.isFakeArtist ? (
              <div className="fake-artist">
                <h1>Du er den falske kunstneren!</h1>
                <div className="x-mark">✗</div>
                <p>Du vet ikke hvilket ord de andre har fått</p>
              </div>
            ) : (
              <div className="real-artist">
                <h1>Du er en ekte kunstner!</h1>
                <div 
                  className="word" 
                  style={{ fontSize: getWordFontSize(player.word || '') }}
                >
                  {player.word}
                </div>
                <p>Tegn dette ordet</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="next-instruction">
        <p>Løft fingeren når du har sett din rolle</p>
      </div>
    </div>
  );
};

export default PlayerReveal;