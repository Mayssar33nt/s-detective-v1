import React from 'react';
import type { Evidence } from '../types';

interface EvidenceChipProps {
  evidence: Evidence;
  onRemove?: () => void;
}

const EvidenceChip: React.FC<EvidenceChipProps> = ({ evidence, onRemove }) => {
  return (
    <div className="inline-flex items-center gap-2 bg-secondary-500/20 border border-secondary-400/50 rounded-full px-4 py-2 text-sm">
      <span className="text-secondary-200">{evidence.title}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="text-secondary-300 hover:text-white transition-colors"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default EvidenceChip;