import type { GameState } from './types';
import { TARGET_EVIDENCES } from '../data/constants';

export const calculateProgress = (state: GameState): number => {
  const evidenceProgress = Math.min(state.evidences.length / TARGET_EVIDENCES, 1) * 0.5;
  const placesProgress = Math.min(state.placesVisited.length / 5, 1) * 0.2;
  const charactersProgress = Math.min(state.charactersTalked.length / 6, 1) * 0.2;
  const linksProgress = Math.min(state.links.length / 2, 1) * 0.1;
  
  return Math.round((evidenceProgress + placesProgress + charactersProgress + linksProgress) * 100);
};

export const canProceedToScoring = (state: GameState): boolean => {
  return state.evidences.length >= 4 && state.charactersTalked.length >= 3;
};

export const getAvailableEvidenceForLinking = (state: GameState) => {
  return state.evidences.filter(evidence => 
    !state.links.some(link => 
      link.evidence1Id === evidence.id || link.evidence2Id === evidence.id
    )
  );
};