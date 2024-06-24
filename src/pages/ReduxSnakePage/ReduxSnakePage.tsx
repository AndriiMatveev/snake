import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./ReduxSnakePage.modules.css";
import { SnakeComponent } from "../../components/SnakeComponent/SnakeComponent";
import { FoodComponent } from "../../components/FoodComponent/FoodComponent";
import { AVAILABLE_MOVES, BOARD_SIZE, DEFAULT_SNAKE, SPEED } from "../../constants/snakeConstants";
import { DOWN, LEFT, RIGHT, UP } from "../../constants/directionConstants";
import { RootState } from "../../reducers";
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
import { Direction, Snake, Food } from "../../types/types";

interface ReduxSnakePageProps extends PropsFromRedux {}

interface PropsFromRedux {
  direction: Direction;
  snake: Snake[];
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

const ReduxSnakePage: React.FC<ReduxSnakePageProps> = ({
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
                                                       }) => {
  const snakeMoveHandler = () => {
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

    let ateFood = false;
    if (snakeHead.x === food.x && snakeHead.y === food.y) {
      ateFood = true;
      setFood(generateFood());
      setScore(score + 1);
      if ((score + 1) % 5 === 0) {
        setLevel(level + 1);
      }
    }

    newSnake.unshift(snakeHead);
    if (!ateFood) {
      newSnake.pop();
    }
    setSnake(newSnake);

    for (let i = 1; i < newSnake.length; i++) {
      if (newSnake[0].x === newSnake[i].x && newSnake[0].y === newSnake[i].y) {
        setGameOver(true);
        if (totalScore < score) {
          localStorage.setItem("reduxTotalScore", JSON.stringify(score));
          setTotalScore(score);
        }
      }
    }
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(snakeMoveHandler, SPEED - level * 50);

    return () => clearInterval(moveInterval);
  }, [level, snakeMoveHandler]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction, setDirection]);

  useEffect(() => {
    manageTotalScore();
  }, [totalScore]);

  const initializeGame = () => {
    setLevel(1);
    setScore(0);
    setGameOver(false);
    setSnake(DEFAULT_SNAKE);
    setFood(generateFood());
    setIsGame(false);
  };

  const generateFood = () => {
    let x: number;
    let y: number;
    do {
      x = Math.floor(Math.random() * BOARD_SIZE);
      y = Math.floor(Math.random() * BOARD_SIZE);
    } while (snake.some((element) => element.x === x && element.y === y));

    return { x, y };
  };

  const startGameHandler = () => {
    initializeGame();
    setIsGame(true);
  };

  const manageTotalScore = () => {
    const newTotalScore = localStorage.getItem("reduxTotalScore");
    if (!newTotalScore) {
      localStorage.setItem("reduxTotalScore", JSON.stringify(totalScore));
      setTotalScore(totalScore);
    } else {
      setTotalScore(Number(newTotalScore));
    }
  };

  return (
      <div className="game">
        <h1>Redux snake</h1>
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
              {Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, i) => (
                  <div className="item" key={i}>
                    {snake.some((element) => element.x === i % BOARD_SIZE && element.y === Math.floor(i / BOARD_SIZE)) && !gameOver && <SnakeComponent />}
                    {food.x === i % BOARD_SIZE && food.y === Math.floor(i / BOARD_SIZE) && !gameOver && <FoodComponent x={food.x} y={food.y} />}
                  </div>
              ))}
              {gameOver && (
                  <div className="gameOverBoard">
                    <h2>Game Over</h2>
                    <p>Press start to Play</p>
                    <button onClick={startGameHandler}>START</button>
                    <p>Total Score: {totalScore}</p>
                  </div>
              )}
            </div>
        )}
      </div>
  );
};

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

const connector = connect(mapStateToProps, {
  setDirection,
  setSnake,
  setLevel,
  setScore,
  setGameOver,
  setTotalScore,
  setIsGame,
  setFood,
});

export default connector(ReduxSnakePage);
