import React, { useCallback, useEffect } from "react";
import "./ReactReduxSnakePage.modules.css";
import { connect } from "react-redux";
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
import {RootState} from "../../reducers";

interface ReactReduxSnakePageInterface {
  snake: Snake[];
  direction: string; // Replace with actual type of direction
  level: number;
  score: number;
  gameOver: boolean;
  totalScore: number;
  isGame: boolean;
  food: Food;
  setDirection: typeof setDirection;
  setSnake: typeof setSnake;
  setLevel: typeof setLevel;
  setScore: typeof setScore;
  setGameOver: typeof setGameOver;
  setTotalScore: typeof setTotalScore;
  setIsGame: typeof setIsGame;
  setFood: typeof setFood;
}

const ReactReduxSnakePage: React.FC<ReactReduxSnakePageInterface> = ({
                                                snake,
                                                direction,
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
                                              }) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsGame(false);
      } else {
        setLevel(1);
        setScore(0);
        setGameOver(false);
        setSnake(DEFAULT_SNAKE);
        setFood(DEFAULT_FOOD);
        setIsGame(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [setLevel, setScore, setGameOver, setSnake, setFood, setIsGame]);

  const generateFood = (): Food => {
    let x: number, y: number;
    do {
      x = Math.floor(Math.random() * BOARD_SIZE);
      y = Math.floor(Math.random() * BOARD_SIZE);
    } while (snake.some((element: Snake) => element.x === x && element.y === y));

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
  }, [direction, snake, setSnake]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      snakeMoveHandler();
    }, SPEED - level * 50);
    return () => clearInterval(moveInterval);
  }, [snakeMoveHandler, level, setSnake]);

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

    const hasCollision = snake
    .slice(1)
    .some((segment: Snake) => segment.x === snake[0].x && segment.y === snake[0].y);
    if (hasCollision) {
      setGameOver(true);
      if (totalScore < score) {
        localStorage.setItem("reactTotalScore", JSON.stringify(score));
        setTotalScore(score);
      }
    }
  }, [
    snake,
    food,
    score,
    totalScore,
    setFood,
    setScore,
    setLevel,
    setSnake,
    setGameOver,
    setTotalScore,
    setIsGame,
  ]);

  useEffect(() => {
    const newTotalScore = localStorage.getItem("reactTotalScore");
    if (!newTotalScore) {
      localStorage.setItem("reactTotalScore", JSON.stringify(0));
    } else {
      setTotalScore(Number(newTotalScore));
    }
  }, [setTotalScore]);

  useEffect(() => {
    return () => {
      setIsGame(false);
      setDirection(RIGHT);
    };
  }, [setIsGame, setDirection]);

  return (
      <div className="game">
        <h1>ReactRedux snake</h1>
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
              {food && !gameOver ? (
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

const mapStateToProps = (state: RootState) => ({
  snake: state.snake.snake.snake,
  direction: state.snake.snake.direction,
  level: state.snake.snake.level,
  score: state.snake.snake.score,
  gameOver: state.snake.snake.gameOver,
  totalScore: state.snake.snake.totalScore,
  isGame: state.snake.snake.isGame,
  food: state.snake.snake.food,
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

export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxSnakePage);
