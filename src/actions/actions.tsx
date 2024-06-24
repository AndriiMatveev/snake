import {Direction, Food, Snake} from "../types/types";


export const setDirection = (direction: Direction) => ({
  type: 'SET_DIRECTION' as const,
  payload: direction,
});

export const setSnake = (snake: Snake[]) => ({
  type: 'SET_SNAKE' as const,
  payload: snake,
});

export const setLevel = (level: number) => ({
  type: 'SET_LEVEL' as const,
  payload: level,
});

export const setScore = (score: number) => ({
  type: 'SET_SCORE' as const,
  payload: score,
});

export const setGameOver = (gameOver: boolean) => ({
  type: 'SET_GAME_OVER' as const,
  payload: gameOver,
});

export const setTotalScore = (totalScore: number) => ({
  type: 'SET_TOTAL_SCORE' as const,
  payload: totalScore,
});

export const setIsGame = (isGame: boolean) => ({
  type: 'SET_IS_GAME' as const,
  payload: isGame,
});

export const setFood = (food: Food) => ({
  type: 'SET_FOOD' as const,
  payload: food,
});
