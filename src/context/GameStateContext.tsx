import React, { createContext, useContext, useState, useEffect } from 'react';

interface GameState {
  level: number;
  experience: number;
  maxExperience: number;
  stakedAmount: string;
  rewardAmount: string;
  timeLeft: number;
  referralCode: string;
  referredBy: string | null;
  totalReferrals: number;
  referralEarnings: number;
  lastRewardUpdate: number;
}

interface GameStateContextType {
  gameState: GameState;
  updateGameState: (updates: Partial<GameState>) => void;
  resetGameState: () => void;
}

const generateReferralCode = () => `MLM${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

const defaultGameState: GameState = {
  level: 1,
  experience: 0,
  maxExperience: 100,
  stakedAmount: '0',
  rewardAmount: '0',
  timeLeft: 0,
  referralCode: generateReferralCode(),
  referredBy: null,
  totalReferrals: 0,
  referralEarnings: 0,
  lastRewardUpdate: Date.now(),
};

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export function GameStateProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(() => {
    const savedState = localStorage.getItem('gameState');
    return savedState ? JSON.parse(savedState) : defaultGameState;
  });

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [gameState]);

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  };

  const resetGameState = () => {
    localStorage.removeItem('gameState');
    setGameState({
      ...defaultGameState,
      referralCode: generateReferralCode(),
    });
  };

  return (
    <GameStateContext.Provider value={{ gameState, updateGameState, resetGameState }}>
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
}