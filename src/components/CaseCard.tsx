import React from 'react';
import type { Case } from '../types';

interface CaseCardProps {
  case: Case;
  isSelected: boolean;
  onSelect: () => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ case: caseItem, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`
        relative cursor-pointer p-6 rounded-xl transition-all duration-300 transform hover:scale-105 card-shadow
        ${isSelected 
          ? 'bg-gradient-to-br from-secondary-500 to-secondary-600 text-white ring-4 ring-secondary-300' 
          : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40'
        }
      `}
    >
      <div className="space-y-3">
        <h3 className="text-xl font-bold">{caseItem.title}</h3>
        <p className={`text-sm leading-relaxed ${isSelected ? 'text-white/90' : 'text-gray-300'}`}>
          {caseItem.description}
        </p>
        {isSelected && (
          <div className="absolute top-2 left-2">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseCard;