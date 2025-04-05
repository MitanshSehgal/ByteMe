import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AIContextType {
  isAILoading: boolean;
  setIsAILoading: (loading: boolean) => void;
  aiError: string | null;
  setAIError: (error: string | null) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiError, setAIError] = useState<string | null>(null);

  return (
    <AIContext.Provider value={{ isAILoading, setIsAILoading, aiError, setAIError }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};