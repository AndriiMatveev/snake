import React, { createContext, useContext, useReducer } from 'react';
import { BOARD_SIZE, DEFAULT_SNAKE } from "../constants/snakeConstants";

const SET_DIRECTION = 'SET_DIRECTION';
const SET_SNAKE = 'SET_SNAKE';
const SET_LEVEL = 'SET_LEVEL';
const SET_SCORE = 'SET_SCORE';
const SET_GAME_OVER = 'SET_GAME_OVER';
const SET_TOTAL_SCORE = 'SET_TOTAL_SCORE';
const SET_FOOD = 'SET_FOOD';
const SET_IS_GAME = 'SET_IS_GAME';

const generateFood = (snake: { x: number; y: number }[]) => {
  let x: number, y: number;
  do {
    x = Math.floor(Math.random() * BOARD_SIZE);
    y = Math.floor(Math.random() * BOARD_SIZE);
  } while (snake.some(element => element.x === x && element.y === y));
  return { x, y };
};

const initialState = {
  direction: 'right' as 'right' | 'up' | 'down' | 'left',
  snake: DEFAULT_SNAKE,
  level: 1,
  score: 0,
  gameOver: false,
  totalScore: 0,
  food: generateFood(DEFAULT_SNAKE),
  isGame: false,
};

type State = typeof initialState;

type Action =
    | { type: typeof SET_DIRECTION; payload: 'right' | 'up' | 'down' | 'left' }
    | { type: typeof SET_SNAKE; payload: typeof DEFAULT_SNAKE }
    | { type: typeof SET_LEVEL; payload: number }
    | { type: typeof SET_SCORE; payload: number }
    | { type: typeof SET_GAME_OVER; payload: boolean }
    | { type: typeof SET_TOTAL_SCORE; payload: number }
    | { type: typeof SET_FOOD; payload: { x: number; y: number } }
    | { type: typeof SET_IS_GAME; payload: boolean };

const snakeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_DIRECTION:
      return { ...state, direction: action.payload };
    case SET_SNAKE:
      return { ...state, snake: action.payload };
    case SET_LEVEL:
      return { ...state, level: action.payload };
    case SET_SCORE:
      return { ...state, score: action.payload };
    case SET_GAME_OVER:
      return { ...state, gameOver: action.payload };
    case SET_TOTAL_SCORE:
      return { ...state, totalScore: action.payload };
    case SET_FOOD:
      return { ...state, food: action.payload };
    case SET_IS_GAME:
      return { ...state, isGame: action.payload };
    default:
      return state;
  }
};

const SnakeContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const SnakeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(snakeReducer, initialState);

  return (
      <SnakeContext.Provider value={{ state, dispatch }}>
        {children}
      </SnakeContext.Provider>
  );
};

export const useSnake = () => {
  const context = useContext(SnakeContext);
  if (!context) {
    throw new Error('useSnake must be used within a SnakeProvider');
  }
  return context;
};
