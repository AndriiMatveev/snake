import React, {createContext, useContext, useState, ReactNode} from "react";
import {DEFAULT_FOOD, DEFAULT_SNAKE} from "../constants/snakeConstants";

interface SnakeGameContextType {
  direction: string;
  setDirection: React.Dispatch<React.SetStateAction<string>>;
  snake: { x: number, y: number }[];
  setSnake: React.Dispatch<React.SetStateAction<{ x: number, y: number }[]>>;
  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  gameOver: boolean;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  totalScore: number;
  setTotalScore: React.Dispatch<React.SetStateAction<number>>;
  isGame: boolean;
  setIsGame: React.Dispatch<React.SetStateAction<boolean>>;
  food: { x: number, y: number };
  setFood: React.Dispatch<React.SetStateAction<{ x: number, y: number }>>;
}

interface SnakeGameProviderProps {
  children: ReactNode;
}
const SnakeGameContext = createContext<SnakeGameContextType | undefined>(undefined);

const SnakeGameProvider = ({ children }: SnakeGameProviderProps) => {
  const [direction, setDirection] = useState("right");
  const [snake, setSnake] = useState(DEFAULT_SNAKE);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [isGame, setIsGame] = useState(false);
  const [food, setFood] = useState(DEFAULT_FOOD);

  return (
      <SnakeGameContext.Provider value={{
        direction, setDirection,
        snake, setSnake,
        level, setLevel,
        score, setScore,
        gameOver, setGameOver,
        totalScore, setTotalScore,
        isGame, setIsGame,
        food, setFood
      }}>
        {children}
      </SnakeGameContext.Provider>
  );
};

const useSnakeGame = () => {
  const context = useContext(SnakeGameContext);
  if (!context) {
    throw new Error("useSnakeGame must be used within a SnakeGameProvider");
  }
  return context;
}

export { SnakeGameProvider, useSnakeGame };
