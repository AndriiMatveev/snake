import { combineReducers } from 'redux';
import snakeReducer from './snakeReducer';

const rootReducer = combineReducers({
  snake: snakeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

