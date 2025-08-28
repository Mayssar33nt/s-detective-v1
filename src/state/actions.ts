import type { CaseId, Detective, PlaceId, CharacterId, Evidence, EvidenceLink } from './types';

export type GameAction =
  | { type: 'SELECT_CASE'; payload: CaseId }
  | { type: 'CREATE_DETECTIVE'; payload: Detective }
  | { type: 'VISIT_PLACE'; payload: PlaceId }
  | { type: 'TALK_TO_CHARACTER'; payload: CharacterId }
  | { type: 'COLLECT_EVIDENCE'; payload: Evidence }
  | { type: 'START_DIALOG'; payload: { characterId: CharacterId } }
  | { type: 'ANSWER_QUESTION'; payload: { questionId: string; evidenceIds: string[]; effects?: { empathy?: number; trust?: number } } }
  | { type: 'CREATE_LINK'; payload: EvidenceLink }
  | { type: 'UPDATE_PROGRESS'; payload: number }
  | { type: 'UPDATE_SCORES'; payload: Partial<{ accuracy: number; speed: number; empathy: number; critical: number; intelligence: number }> }
  | { type: 'COMPLETE_GAME' }
  | { type: 'RESET_GAME' }
  | { type: 'LOAD_GAME'; payload: any };

export const selectCase = (caseId: CaseId): GameAction => ({
  type: 'SELECT_CASE',
  payload: caseId
});

export const createDetective = (detective: Detective): GameAction => ({
  type: 'CREATE_DETECTIVE', 
  payload: detective
});

export const visitPlace = (placeId: PlaceId): GameAction => ({
  type: 'VISIT_PLACE',
  payload: placeId
});

export const talkToCharacter = (characterId: CharacterId): GameAction => ({
  type: 'TALK_TO_CHARACTER',
  payload: characterId
});

export const collectEvidence = (evidence: Evidence): GameAction => ({
  type: 'COLLECT_EVIDENCE',
  payload: evidence
});

export const startDialog = (characterId: CharacterId): GameAction => ({
  type: 'START_DIALOG',
  payload: { characterId }
});

export const answerQuestion = (questionId: string, evidenceIds: string[], effects?: { empathy?: number; trust?: number }): GameAction => ({
  type: 'ANSWER_QUESTION',
  payload: { questionId, evidenceIds, effects }
});

export const createLink = (link: EvidenceLink): GameAction => ({
  type: 'CREATE_LINK',
  payload: link
});

export const updateProgress = (progress: number): GameAction => ({
  type: 'UPDATE_PROGRESS',
  payload: progress
});

export const updateScores = (scores: Partial<{ accuracy: number; speed: number; empathy: number; critical: number; intelligence: number }>): GameAction => ({
  type: 'UPDATE_SCORES',
  payload: scores
});

export const completeGame = (): GameAction => ({
  type: 'COMPLETE_GAME'
});

export const resetGame = (): GameAction => ({
  type: 'RESET_GAME'
});

export const loadGame = (state: any): GameAction => ({
  type: 'LOAD_GAME',
  payload: state
});