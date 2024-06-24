import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import "./ReactSnakePage.modules.css";
import { SnakeComponent } from "../../components/SnakeComponent/SnakeComponent";
import { FoodComponent } from "../../components/FoodComponent/FoodComponent";
import { AVAILABLE_MOVES, BOARD_SIZE, DEFAULT_SNAKE, SPEED } from "../../constants/snakeConstants";
import { DOWN, LEFT, RIGHT, UP } from "../../constants/directionConstants";
import {
  setDirection,
  setFood,
  setGameOver,
  setIsGame,
  setLevel,
  setScore,
  setSnake,
  setTotalScore
} from "../../actions/actions";
import {RootState} from "../../reducers";
import {Direction, Food, Snake} from "../../types/types";

interface Props {
  direction: Direction;
  snake: Snake[];
  level: number;
  score: number;
  gameOver: boolean;
  totalScore: number;
  isGame: boolean;
  food: Food;
  setDirection: (direction: Direction) => void;
  setSnake: (snake: Snake[]) => void;
  setLevel: (level: number) => void;
  setScore: (score: number) => void;
  setGameOver: (gameOver: boolean) => void;
  setTotalScore: (totalScore: number) => void;
  setIsGame: (isGame: boolean) => void;
  setFood: (food: Food) => void;
}

function ReactSnakePage({
                          direction,
                          snake,
                          level,
                          score,
                          gameOver,
                          totalScore,
                          isGame,
                          food,
                          setDirection,
                          setSnake,
                          setLevel,
                          setScore,
                          setGameOver,
                          setTotalScore,
                          setIsGame,
                          setFood,
                        }: Props) {
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
    setFood(generateFood());
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
  }, [direction, setDirection]);

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
  }, [snake, direction, setSnake]);

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
      setScore(score + 1);
      if ((score + 1) % 5 === 0) {
        setLevel(level + 1);
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
  }, [snake, food, generateFood, score, totalScore, setFood, setScore, setLevel, setSnake, setGameOver, setTotalScore]);

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
        <h1>React Snake</h1>
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

const mapStateToProps = (state: RootState) => ({
  direction: state.snake.direction,
  snake: state.snake.snake,
  level: state.snake.level,
  score: state.snake.score,
  gameOver: state.snake.gameOver,
  totalScore: state.snake.totalScore,
  isGame: state.snake.isGame,
  food: state.snake.food,
});

const mapDispatchToProps = {
  setDirection,
  setSnake,
  setLevel,
  setScore,
  setGameOver,
  setTotalScore,
  setIsGame,
  setFood,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactSnakePage);
