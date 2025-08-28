import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { gameReducer, initialState } from './reducer';
import type { GameState, GameAction } from './types';
import { saveGameState, loadGameState } from './storage';

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load game state on mount
  useEffect(() => {
    const savedState = loadGameState();
    if (savedState) {
      dispatch({ type: 'LOAD_GAME', payload: savedState });
    }
  }, []);

  // Save game state on changes
  useEffect(() => {
    if (state.selectedCaseId || state.detective) {
      saveGameState(state);
    }
  }, [state]);

  const value: GameContextType = {
    state,
    dispatch
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};