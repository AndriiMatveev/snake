import React, { useCallback, useEffect, useState } from "react";
import "./ReactSnakePage.modules.css";
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

function ReactSnakePage() {
  const [direction, setDirection] = useState("right");
  const [snake, setSnake] = useState(DEFAULT_SNAKE);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [isGame, setIsGame] = useState(false);
  const [food, setFood] = useState(DEFAULT_FOOD);

  const generateFood = () => {
    let x: number, y: number;
    do {
      x = Math.floor(Math.random() * BOARD_SIZE);
      y = Math.floor(Math.random() * BOARD_SIZE);
    } while (snake.some((element) => element.x === x && element.y === y));

    return { x, y };
  };

  const startGameHandler = () => {
    setLevel(1);
    setScore(0);
    setGameOver(false);
    setSnake(DEFAULT_SNAKE);
    setFood(DEFAULT_FOOD);
    setIsGame(true);
  };

  const pressKeyHandler = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case AVAILABLE_MOVES[0]:
        if (direction !== DOWN) {
          setDirection(UP);
        }
        break;
      case AVAILABLE_MOVES[1]:
        if (direction !== UP) {
          setDirection(DOWN);
        }
        break;
      case AVAILABLE_MOVES[2]:
        if (direction !== LEFT) {
          setDirection(RIGHT);
        }
        break;
      case AVAILABLE_MOVES[3]:
        if (direction !== RIGHT) {
          setDirection(LEFT);
        }
        break;
      default:
        break;
    }
  }, [direction]);

  const snakeMoveHandler = useCallback(() => {
    const newSnake = [...snake];
    const snakeHead = { ...newSnake[0] };

    switch (direction) {
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
    setSnake(newSnake);
  }, [snake, direction]);

  useEffect(() => {
    const moveInterval = setInterval(snakeMoveHandler, SPEED - level * 50);
    return () => clearInterval(moveInterval);
  }, [level, snakeMoveHandler]);

  useEffect(() => {
    document.addEventListener("keydown", pressKeyHandler);
    return () => document.removeEventListener("keydown", pressKeyHandler);
  }, [pressKeyHandler]);

  useEffect(() => {
    if (snake[0].x === food.x && snake[0].y === food.y) {
      setFood(generateFood());
      setScore((prevScore) => prevScore + 1);
      if ((score + 1) % 5 === 0) {
        setLevel((prevLevel) => prevLevel + 1);
      }
      const newSnake = [...snake];
      const tail = { ...newSnake[newSnake.length - 1] };
      newSnake.push(tail);
      setSnake(newSnake);
    }

    const hasCollision = snake.slice(1).some((segment) => segment.x === snake[0].x && segment.y === snake[0].y);
    if (hasCollision) {
      setGameOver(true);
      if (totalScore < score) {
        localStorage.setItem("reactTotalScore", JSON.stringify(score));
        setTotalScore(score);
      }
    }
  }, [snake, food, generateFood, score, totalScore]);

  useEffect(() => {
    const newTotalScore = localStorage.getItem("reactTotalScore");
    if (!newTotalScore) {
      localStorage.setItem("reactTotalScore", JSON.stringify(0));
    } else {
      setTotalScore(Number(newTotalScore));
    }
  }, []);

  return (
      <div className="game">
        <h1>React snake</h1>
        <section>
          <p>Level: {level}</p>
          <p>Score: {score}</p>
        </section>
        {!isGame ? (
            <div className="startBoard">
              <p>Press start to Play</p>
              <button onClick={startGameHandler}>START</button>
              <p>Total Score: {totalScore}</p>
            </div>
        ) : (
            <div className="gameBoard">
              {!gameOver ? (
                  <FoodComponent x={food.x} y={food.y} />
              ) : (
                  <div className="gameOverBoard">
                    <h2>Game Over</h2>
                    <p>Press start to Play</p>
                    <button onClick={startGameHandler}>START</button>
                    <p>Total Score: {totalScore}</p>
                  </div>
              )}
              {Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, i) => (
                  <div className="item" key={i}>
                    {!gameOver &&
                        snake.some(
                            (element) =>
                                element.x === i % BOARD_SIZE &&
                                element.y === Math.floor(i / BOARD_SIZE)
                        ) && <SnakeComponent />}
                  </div>
              ))}
            </div>
        )}
      </div>
  );
}

export default ReactSnakePage;
