export const APP_PAGES = {
  MainMenu: '/',
  ReactSnake: '/react-snake',
  ReduxSnake: '/redux-snake',
  ReactReduxSnake: '/react-redux-snake'
} as const;

type TAppPages = typeof APP_PAGES;
export type VAppPages = TAppPages[keyof TAppPages];
