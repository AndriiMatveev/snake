import {DEFAULT_FOOD, DEFAULT_SNAKE} from "../constants/snakeConstants";
import {RIGHT} from "../constants/directionConstants";

const initialState = {
  direction: RIGHT,
  snake: DEFAULT_SNAKE,
  level: 1,
  score: 0,
  gameOver: false,
  totalScore: 0,
  food: DEFAULT_FOOD,
  isGame: false,
};

const SET_DIRECTION = "SET_DIRECTION";
const SET_SNAKE = "SET_SNAKE";
const SET_LEVEL = "SET_LEVEL";
const SET_SCORE = "SET_SCORE";
const SET_GAME_OVER = "SET_GAME_OVER";
const SET_TOTAL_SCORE = "SET_TOTAL_SCORE";
const SET_FOOD = "SET_FOOD";
const SET_IS_GAME = "SET_IS_GAME";

const snakeReducer = (state = initialState, action: any) => {
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

export default snakeReducer;
