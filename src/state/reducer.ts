import type { GameState, GameAction } from './types';
import { evidenceRegistry } from '../data/evidence';

const initialState: GameState = {
  selectedCaseId: null,
  detective: null,
  evidences: [],
  placesVisited: [],
  charactersTalked: [],
  links: [],
  currentDialog: {
    characterId: null,
    questionIndex: 0,
    answeredQuestionIds: []
  },
  progress: 0,
  scores: {
    accuracy: 0,
    speed: 0,
    empathy: 0,
    critical: 0,
    intelligence: 0
  },
  startedAt: null,
  completedAt: null
};

export const gameReducer = (state: GameState = initialState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SELECT_CASE':
      return {
        ...state,
        selectedCaseId: action.payload,
        startedAt: new Date()
      };

    case 'CREATE_DETECTIVE':
      return {
        ...state,
        detective: action.payload
      };

    case 'VISIT_PLACE':
      if (state.placesVisited.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        placesVisited: [...state.placesVisited, action.payload]
      };

    case 'TALK_TO_CHARACTER':
      if (state.charactersTalked.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        charactersTalked: [...state.charactersTalked, action.payload]
      };

    case 'COLLECT_EVIDENCE':
      const existingEvidence = state.evidences.find(e => e.id === action.payload.id);
      if (existingEvidence) {
        return state;
      }
      return {
        ...state,
        evidences: [...state.evidences, action.payload]
      };

    case 'START_DIALOG':
      return {
        ...state,
        currentDialog: {
          characterId: action.payload.characterId,
          questionIndex: 0,
          answeredQuestionIds: []
        }
      };

    case 'ANSWER_QUESTION':
      const newEvidences = [...state.evidences];
      action.payload.evidenceIds.forEach(evidenceId => {
        const evidence = evidenceRegistry[evidenceId];
        if (evidence && !newEvidences.find(e => e.id === evidenceId)) {
          newEvidences.push(evidence);
        }
      });

      return {
        ...state,
        evidences: newEvidences,
        currentDialog: {
          ...state.currentDialog,
          answeredQuestionIds: [...state.currentDialog.answeredQuestionIds, action.payload.questionId]
        }
      };

    case 'CREATE_LINK':
      return {
        ...state,
        links: [...state.links, action.payload]
      };

    case 'UPDATE_PROGRESS':
      return {
        ...state,
        progress: action.payload
      };

    case 'UPDATE_SCORES':
      return {
        ...state,
        scores: {
          ...state.scores,
          ...action.payload
        }
      };

    case 'COMPLETE_GAME':
      return {
        ...state,
        completedAt: new Date()
      };

    case 'RESET_GAME':
      return initialState;

    case 'LOAD_GAME':
      return {
        ...action.payload,
        startedAt: action.payload.startedAt ? new Date(action.payload.startedAt) : null,
        completedAt: action.payload.completedAt ? new Date(action.payload.completedAt) : null
      };

    default:
      return state;
  }
};

export { initialState };