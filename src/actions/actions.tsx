import {Direction, Food, Snake} from "../types/types";


export const setDirection = (direction: Direction) => ({
  type: 'SET_DIRECTION',
  payload: direction,
});

export const setSnake = (snake: Snake[]) => ({
  type: 'SET_SNAKE',
  payload: snake,
});

export const setLevel = (level: number) => ({
  type: 'SET_LEVEL',
  payload: level,
});

export const setScore = (score: number) => ({
  type: 'SET_SCORE',
  payload: score,
});

export const setGameOver = (gameOver: boolean) => ({
  type: 'SET_GAME_OVER',
  payload: gameOver,
});

export const setTotalScore = (totalScore: number) => ({
  type: 'SET_TOTAL_SCORE',
  payload: totalScore,
});

export const setIsGame = (isGame: boolean) => ({
  type: 'SET_IS_GAME',
  payload: isGame,
});

export const setFood = (food: Food) => ({
  type: 'SET_FOOD',
  payload: food,
});
