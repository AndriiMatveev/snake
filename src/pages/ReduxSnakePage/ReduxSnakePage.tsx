import React, { useCallback, useEffect, useState } from "react";
import "./ReduxSnakePage.modules.css";
import { SnakeComponent } from "../../components/SnakeComponent/SnakeComponent";
import { FoodComponent } from "../../components/FoodComponent/FoodComponent";
import {
  AVAILABLE_MOVES,
  BOARD_SIZE,
  DEFAULT_FOOD,
  DEFAULT_SNAKE,
  SPEED
} from "../../constants/snakeConstants";
import { DOWN, LEFT, RIGHT, UP } from "../../constants/directionConstants";
import {
  setDirection,
  setSnake,
  setLevel,
  setScore,
  setGameOver,
  setTotalScore,
  setIsGame,
  setFood,
} from "../../actions/actions";
import { Snake, Food } from "../../types/types";
import store from "../../store/store";

const ReduxSnakePage = () => {
  const [state, setState] = useState(store.getState().snake.snake);

  const dispatch = store.dispatch;

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newState = store.getState().snake.snake;
      setState(newState);
    });
    return unsubscribe;
  }, []);


  const generateFood = (): Food => {
    let x: number, y: number;
    do {
      x = Math.floor(Math.random() * BOARD_SIZE);
      y = Math.floor(Math.random() * BOARD_SIZE);
    } while (state.snake.some((element: Snake) => element.x === x && element.y === y));

    return { x, y };
  };

  const startGameHandler = () => {
    dispatch(setLevel(1));
    dispatch(setScore(0));
    dispatch(setGameOver(false));
    dispatch(setSnake(DEFAULT_SNAKE));
    dispatch(setFood(DEFAULT_FOOD));
    dispatch(setIsGame(true));
  };

  const pressKeyHandler = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case AVAILABLE_MOVES[0]:
        if (state.direction !== DOWN) {
          dispatch(setDirection(UP));
        }
        break;
      case AVAILABLE_MOVES[1]:
        if (state.direction !== UP) {
          dispatch(setDirection(DOWN));
        }
        break;
      case AVAILABLE_MOVES[2]:
        if (state.direction !== LEFT) {
          dispatch(setDirection(RIGHT));
        }
        break;
      case AVAILABLE_MOVES[3]:
        if (state.direction !== RIGHT) {
          dispatch(setDirection(LEFT));
        }
        break;
      default:
        break;
    }
  }, [state.direction, dispatch]);

  const snakeMoveHandler = useCallback(() => {
    const newSnake = [...state.snake];
    const snakeHead = { ...newSnake[0] };

    switch (state.direction) {
      case RIGHT:
        snakeHead.x + 1 > 9 ? (snakeHead.x = 0) : (snakeHead.x += 1);
        break;
      case LEFT:
        snakeHead.x - 1 < 0 ? (snakeHead.x = 9) : (snakeHead.x -= 1);
        break;
      case UP:
        snakeHead.y - 1 < 0 ? (snakeHead.y = 9) : (snakeHead.y -= 1);
        break;
      case DOWN:
        snakeHead.y + 1 > 9 ? (snakeHead.y = 0) : (snakeHead.y += 1);
        break;
      default:
        break;
    }

    newSnake.unshift(snakeHead);
    if (newSnake.length > 1) {
      newSnake.pop();
    }
    dispatch(setSnake(newSnake));
  }, [state.snake, state.direction, dispatch]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      snakeMoveHandler();
    }, SPEED - state.level * 50);
    return () => clearInterval(moveInterval);
  }, [dispatch, snakeMoveHandler, state.level]);

  useEffect(() => {
    document.addEventListener("keydown", pressKeyHandler);
    return () => document.removeEventListener("keydown", pressKeyHandler);
  }, [pressKeyHandler]);

  useEffect(() => {
    if (state.snake[0].x === state.food.x && state.snake[0].y === state.food.y) {
      dispatch(setFood(generateFood()));
      dispatch(setScore(state.score + 1));
      if ((state.score + 1) % 5 === 0) {
        dispatch(setLevel(state.level + 1));
      }
      const newSnake = [...state.snake];
      const tail = { ...newSnake[newSnake.length - 1] };
      newSnake.push(tail);
      dispatch(setSnake(newSnake));
    }

    const hasCollision = state.snake
    .slice(1)
    .some((segment: Snake) => segment.x === state.snake[0].x && segment.y === state.snake[0].y);
    if (hasCollision) {
      dispatch(setGameOver(true));
      if (state.totalScore < state.score) {
        localStorage.setItem("reactTotalScore", JSON.stringify(state.score));
        dispatch(setTotalScore(state.score));
      }
    }
  }, [
    dispatch,
    state.snake,
    state.food,
    state.score,
    state.totalScore,
    setFood,
    setScore,
    setLevel,
    setSnake,
    setGameOver,
    setTotalScore,
  ]);

  useEffect(() => {
    const newTotalScore = localStorage.getItem("reactTotalScore");
    if (!newTotalScore) {
      localStorage.setItem("reactTotalScore", JSON.stringify(0));
    } else {
      dispatch(setTotalScore(Number(newTotalScore)));
    }
  }, [dispatch, setTotalScore]);

  useEffect(() => {
    return () => {
      dispatch(setIsGame(false));
      dispatch(setDirection(RIGHT));
    };
  }, [dispatch]);

  return (
      <div className="game">
        <h1>Redux snake</h1>
        <section>
          <p>Level: {state.level}</p>
          <p>Score: {state.score}</p>
        </section>
        {!state.isGame ? (
            <div className="startBoard">
              <p>Press start to Play</p>
              <button onClick={startGameHandler}>START</button>
              <p>Total Score: {state.totalScore}</p>
            </div>
        ) : (
            <div className="gameBoard">
              {state.food && !state.gameOver ? (
                  <FoodComponent x={state.food.x} y={state.food.y} />
              ) : (
                  <div className="gameOverBoard">
                    <h2>Game Over</h2>
                    <p>Press start to Play</p>
                    <button onClick={startGameHandler}>START</button>
                    <p>Total Score: {state.totalScore}</p>
                  </div>
              )}
              {Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, i) => (
                  <div className="item" key={i}>
                    {!state.gameOver &&
                        state.snake.some(
                            (element: Snake) =>
                                element.x === i % BOARD_SIZE &&
                                element.y === Math.floor(i / BOARD_SIZE)
                        ) && <SnakeComponent />}
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default ReduxSnakePage;
