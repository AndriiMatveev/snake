import rootReducer from "../reducers";
import {configureStore} from "@reduxjs/toolkit";


const store = configureStore({
  reducer: {
    snake: rootReducer,
  }
});

export default store;
