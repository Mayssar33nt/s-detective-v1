import React from 'react';
import type { Character } from '../types';

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
  hasInteracted?: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick, hasInteracted = false }) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative cursor-pointer p-4 rounded-xl transition-all duration-300 transform hover:scale-105 card-shadow
        ${hasInteracted 
          ? 'bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-400/50' 
          : 'bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40'
        }
      `}
    >
      <div className="text-center space-y-3">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
          {character.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-white">{character.name}</h3>
          <p className="text-sm text-gray-300">{character.role}</p>
        </div>
        {hasInteracted && (
          <div className="absolute top-2 left-2">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterCard;