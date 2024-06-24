import { combineReducers } from 'redux';
import {RIGHT} from "../constants/directionConstants";
import {DEFAULT_SNAKE} from "../constants/snakeConstants";

const initialSnakeState = {
  direction: RIGHT,
  snake: DEFAULT_SNAKE,
  level: 1,
  score: 0,
  gameOver: false,
  totalScore: 0,
  isGame: false,
  food: { x: 0, y: 0 },
};

interface Action {
  type: string;
  payload: any;
}
const snakeReducer = (state = initialSnakeState, action: Action) => {
  switch (action.type) {
    case 'SET_DIRECTION':
      return {
        ...state,
        direction: action.payload,
      };
    case 'SET_SNAKE':
      return {
        ...state,
        snake: action.payload,
      };
    case 'SET_LEVEL':
      return {
        ...state,
        level: action.payload,
      };
    case 'SET_SCORE':
      return {
        ...state,
        score: action.payload,
      };
    case 'SET_GAME_OVER':
      return {
        ...state,
        gameOver: action.payload,
      };
    case 'SET_TOTAL_SCORE':
      return {
        ...state,
        totalScore: action.payload,
      };
    case 'SET_IS_GAME':
      return {
        ...state,
        isGame: action.payload,
      };
    case 'SET_FOOD':
      return {
        ...state,
        food: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  snake: snakeReducer,
});
