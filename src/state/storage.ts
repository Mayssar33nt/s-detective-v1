import type { GameState } from './types';

const STORAGE_KEY = 'social_detective_game';

export const saveGameState = (state: GameState): void => {
  try {
    // Check if localStorage is available
    if (typeof Storage === 'undefined') {
      console.warn('localStorage is not supported');
      return;
    }
    
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
};

export const loadGameState = (): GameState | null => {
  try {
    // Check if localStorage is available
    if (typeof Storage === 'undefined') {
      console.warn('localStorage is not supported');
      return null;
    }
    
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (!serializedState) return null;
    
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Failed to load game state:', error);
    return null;
  }
};

export const clearGameState = (): void => {
  try {
    // Check if localStorage is available
    if (typeof Storage === 'undefined') {
      console.warn('localStorage is not supported');
      return;
    }
    
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear game state:', error);
  }
};